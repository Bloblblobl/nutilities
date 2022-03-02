<script lang="ts">
    import Calendar from './Calendar.svelte';
    import Grid from './Grid.svelte';
    import Route from './Route.svelte';
    import SpotifySearch from './SpotifySearch.svelte'
    import TopBar from './TopBar.svelte';

    import '../global.css';
</script>

<TopBar/>
<main>
    <Route path="/">
        <Grid rows={4} columns={5}/>
    </Route>
    <Route path="/search">
        <SpotifySearch/>
    </Route>
    <Route path="/calendar">
        <Calendar/>
    </Route>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    :root {
        --topbar-height: 3.5rem;

        --c-light-gray: #b5bec6;
        --c-dark-gray: #2b2d42;
        --c-yellow: #f4e04d;
        --c-mint: #8be8cb;

        --c-spotify-green: #1db954;
        --c-spotify-light-green: #1ed761;
        --c-spotify-black: #191414;
    }

    :global(html, body) {
        height: 100%;
        margin: 0;
        width: 100%;
    }

    :global(html) {
        color: white;
        font-family: 'Rubik', cursive;
    }

    main {
        background-color: var(--c-dark-gray);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--topbar-height));
        padding: 1rem;
    }
</style>