<script lang="ts">
    import Link from './Link.svelte';
    import SpotifyLogin from './SpotifyLogin.svelte';

    import logo512 from '../img/logo/512x512.png';

    export let name: string;
</script>

<header>
    <div id="left-group" class="header-group">
        <img src="{logo512}" alt="Nutilities Logo">
        <h1>Hello, <a href="{window.location.origin + window.location.pathname}">{name}</a>!</h1>
        <Link to="/">
            <button class="main-button">Home</button>
        </Link>
        <Link to="/other">
            <button class="main-button">Other</button>
        </Link>
    </div>
    <div id="right-group" class="header-group">
        <SpotifyLogin/>
    </div>
</header>

<style>
    header {
        align-items: center;
        background-color: var(--c-dark-gray);
        border-bottom: solid 1px var(--c-light-gray);
        box-sizing: border-box;
        display: flex;
        height: var(--topbar-height);
        justify-content: space-between;
        width: 100%;
    }

    button {
        margin: 0 0.5rem;
    }

    .header-group {
        align-items: center;
        display: flex;
    }

    img {
        border: 3px solid var(--c-light-gray);
        border-radius: 1rem;
        box-sizing: border-box;
        cursor:pointer;
        filter: grayscale(100%);
        margin: 0 0.5rem;
        max-height: calc(var(--topbar-height) - 1rem);
        transform: rotate(180deg);
        transition: 1s;
    }

    img:hover {
        border-color: var(--c-yellow);
        filter: none;
        transform: rotate(0);
        transition: 1s;
    }

    h1 {
        color: var(--c-light-gray);
        font-family: 'Lobster', cursive;
        margin: 0 0.5rem;
    }

    h1 a {
        color: inherit;
    }

    h1 a:not(:hover) {
        text-decoration: none;
    }
</style>