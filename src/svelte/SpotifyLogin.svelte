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
        db.local.removeItem('SpotifyAccessToken');
        db.local.removeItem('SpotifyRefreshToken');
        db.local.removeItem('SpotifyUser');
        window.location.reload();
    }

    if ('code' in queryParameters) {
        spotify.requestAccessToken({ code: queryParameters.code }).then(() => {
            delete queryParameters.code;
            window.location.search = new URLSearchParams(queryParameters).toString();
        });
    }

    const accessToken = db.local.getItem('SpotifyAccessToken');

    async function getUser() {
        const user = db.local.getItem('SpotifyUser');
        if (user !== null) {
            return JSON.parse(user);
        }

        const response = await spotify.makeRequest('me');
        db.local.setItem('SpotifyUser', JSON.stringify(response));
        return response;
    }

    async function getRecentlyPlayedTracks() {
        const response = await spotify.makeRequest('me/player/recently-played');
        recentlyPlayed.set(response);
    }

    getRecentlyPlayedTracks();
</script>

{#if accessToken === null}
<span><button class="main-button" on:click={logIn}>Log In</button></span>
{:else}
<span><button class="main-button" on:click={clearLocalStorage}>Clear Storage</button></span>
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
    span {
        padding: 0 1rem;
    }

    div {
        margin: 0 1rem;
        color: white;
        font-size: 1.25rem;
        font-weight: 300;
    }

    a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: inherit;
    }

    a:hover {
        color: var(--c-spotify-light-green);
    }

    a:not(:hover) {
        text-decoration: none;
    }

    img {
        margin: 0 0.5rem;
        max-height: 3rem;
        border-radius: 50%;
    }
</style>