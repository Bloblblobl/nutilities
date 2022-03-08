<script lang="ts">
    import Calendar from './Calendar.svelte';
    import Grid from './Grid.svelte';
    import Route from './Route.svelte';
    import SpotifySearch from './SpotifySearch.svelte'
    import TopBar from './TopBar.svelte';

    import '../global.css';
</script>

<TopBar/>
<Route path="/">
    <Grid rows={4} columns={5} />
</Route>
<Route path="/search">
    <main class="search">
        <SpotifySearch />
    </main>
</Route>
<Route path="/calendar">
    <Calendar />
</Route>

<style>
    .search {
        display: flex;
        flex-direction: column;
    }
</style>