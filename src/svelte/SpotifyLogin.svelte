<script lang="ts">
import { db } from '../ts/clients/db';

    import * as spotify from '../ts/clients/spotify';
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParameters = Object.fromEntries(urlSearchParams.entries());

    const logIn = () => {
        spotify.redirectToAuthorize().then((result) => {
            window.location.href = result.data.redirectURL;
        });
    }

    const clearLocalStorage = () => {
        db.local.removeItem('SpotifyAccessToken');
        db.local.removeItem('SpotifyRefreshToken');
        window.location.reload();
    }

    if ('code' in queryParameters) {
        spotify.requestAccessToken(queryParameters.code).then((result) => {
            db.local.setItem('SpotifyAccessToken', result.data.access_token);
            db.local.setItem('SpotifyRefreshToken', result.data.refresh_token);
            delete queryParameters.code;
            console.log(new URLSearchParams(queryParameters).toString());
            window.location.search = new URLSearchParams(queryParameters).toString();
        });
    }

    const accessToken = db.local.getItem('SpotifyAccessToken');

</script>

{#if accessToken === null}
<button on:click={logIn}>Log In</button>
{:else}
<div>You're logged in ya idiot</div>
<button on:click={clearLocalStorage}>Clear Storage</button>
{/if}

<style>
    button {
        box-sizing: border-box;

        margin: 1rem;
        padding: 0.25rem;

        background-color: var(--c-spotify-light-green);
        color: var(--c-spotify-black);

        font-size: 2rem;
        font-family: 'Rubik', cursive;
        font-weight: 300;

        border: none;
        border-radius: 0;

        cursor: pointer;
    }   

    button:hover {
        background-color: var(--c-spotify-green);
        color: white;
    }

    div {
        padding-left: 100;
        color: white;
        font-size: 1.25rem;
        font-family: 'Rubik', cursive;
        font-weight: 300;
    }
</style>