<script lang="ts">
    import SpotifyLogin from './SpotifyLogin.svelte';
    import logo512 from '../img/logo/512x512.png';

    export let name: string;
</script>

<header>
    <img src="{logo512}" alt="Nutilities Logo">
    <h1>Hello, {name}!</h1>
    <SpotifyLogin/>
</header>

<style>
    header {
        box-sizing: border-box;
        display: flex;
        align-items: center;

        width: 100%;
        height: var(--topbar-height);

        background-color: var(--c-dark-gray);
        border-bottom: solid 1px var(--c-light-gray);
    }

    img {
        cursor:pointer;
        box-sizing: border-box;
        margin: 0.5rem;
        max-height: calc(var(--topbar-height) - 1rem);
        border: 3px solid var(--c-light-gray);
        filter: grayscale(100%);
        border-radius: 1rem;
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
        margin: 0 0 0 0.5rem;
        color: var(--c-light-gray);
        font-family: 'Lobster', cursive;
    }
</style>