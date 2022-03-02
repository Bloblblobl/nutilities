<script lang="ts">
    import Link from './Link.svelte';
    import SpotifyLogin from './SpotifyLogin.svelte';

    import logo512 from '../img/logo/512x512.png';
</script>

<header>
    <section class="header-group">
        <img src="{logo512}" alt="Nutilities Logo">
        <h1>Nutilities</h1>
        <Link to="/">
            <button class="main-button">Home</button>
        </Link>
        <Link to="/search">
            <button class="main-button">Search</button>
        </Link>
        <Link to="/calendar">
            <button class="main-button">Calendar</button>
        </Link>
    </section>
    <section class="header-group">
        <SpotifyLogin/>
    </section>
</header>

<style>
    button {
        margin: 0 0.5rem;
    }

    img {
        border: 3px solid var(--c-light-gray);
        border-radius: 50%;
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

    img:hover + h1 {
        color: white;
    }

    h1 {
        color: var(--c-light-gray);
        font-family: 'Lobster', cursive;
        margin: 0 0.25rem;
    }

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

    .header-group {
        align-items: center;
        display: flex;
    }
</style>