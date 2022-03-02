<script lang="ts">
    import { db } from '../ts/clients/db';
    import * as spotify from '../ts/clients/spotify';
    import { recentlyPlayed } from '../ts/stores';

    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParameters = Object.fromEntries(urlSearchParams.entries());

    const logIn = () => {
        spotify.redirectToAuthorize().then((result) => {
            window.location.href = result.data.redirectURI;
        });
    }

    const clearLocalStorage = () => {
        db.local.getKeys().forEach(key => {
            const keyParts = key.split(':');
            if (keyParts.length > 1 && keyParts[0] === 'spotify') {
                db.local.delete(key);
            }
        });
        window.location.reload();
    }

    if ('code' in queryParameters) {
        spotify.requestAccessToken({ code: queryParameters.code }).then(() => {
            delete queryParameters.code;
            window.location.search = new URLSearchParams(queryParameters).toString();
        });
    }

    const accessToken = db.local.get('spotify:access-token');

    async function getUser() {
        const user = db.local.get('spotify:user-profile');
        if (user !== null) {
            return JSON.parse(user);
        }

        const response = await spotify.makeRequest('me');
        db.local.set('spotify:user-profile', JSON.stringify(response));
        return response;
    }

    async function getRecentlyPlayedTracks() {
        const response = await spotify.makeRequest('me/player/recently-played');
        recentlyPlayed.set(response);
    }

    getRecentlyPlayedTracks();
</script>

{#if accessToken === null}
<button class="main-button" on:click={logIn}>Log In</button>
{:else}
<button class="main-button" on:click={clearLocalStorage}>Clear Storage (Spotify)</button>
<div>
    {#await getUser()}
        <p>Logged In...</p>
    {:then user}
        <a href="{user.external_urls.spotify}">
            <p>{user.display_name}</p>
            <img src={user.images[0].url} alt="{user.display_name}'s Spotify Profile"/>
        </a>
    {/await}
</div>
{/if}

<style>
    a {
        align-items: center;
        color: inherit;
        display: flex;
        justify-content: space-between;
        text-decoration: none;
    }

    a:hover {
        color: var(--c-spotify-light-green);
        text-decoration: underline;
    }

    div {
        margin: 0 1rem;
        font-size: 1.25rem;
        font-weight: 300;
    }

    img {
        border-radius: 50%;
        margin: 0 0.5rem;
        max-height: calc(var(--topbar-height) - 0.5rem);
    }
</style>