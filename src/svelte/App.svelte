<script lang="ts">
    import Grid from './Grid.svelte';
    import Route from './Route.svelte';
    import TopBar from './TopBar.svelte';

    // import { db } from '../ts/clients/db';
    // import * as database from 'firebase/database';
    import '../global.css';
    
    export let name: string;

    // const dbRef: database.DatabaseReference = database.ref(db.realtime);
    // console.log(database.child(dbRef, 'dynamic-bookmarks'));
</script>

<TopBar {name}/>
<main>
    <Route path="/">
        <Grid rows={4} columns={5}/>
    </Route>
    <Route path="/other">
        <h1>This is other.</h1>
    </Route>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

    :root {
        --topbar-height: 4rem;

        --c-light-gray: #b5bec6;
        --c-dark-gray: #2b2d42;
        --c-yellow: #f4e04d;
        --c-mint: #8be8cb;

        --c-spotify-green: #1db954;
        --c-spotify-light-green: #1ed761;
        --c-spotify-black: #191414;
    }

    :global(html, body) {
        width: 100%;
        height: 100%;

        margin: 0;
    }

    main {
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--topbar-height));
        background-color: var(--c-dark-gray);
    }
</style>