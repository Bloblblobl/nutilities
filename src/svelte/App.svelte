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
        <Grid rows={4} columns={5} />
    </Route>
    <Route path="/search">
        <SpotifySearch />
    </Route>
    <Route path="/calendar">
        <Calendar />
    </Route>
</main>

<style>
    main {
        background-color: var(--c-dark-gray);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--topbar-height));
    }
</style>