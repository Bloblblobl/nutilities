<script lang="ts">
    import * as spotify from '../ts/clients/spotify';

    const search = async () => {
        const searchString = document.querySelector('#spotify-search').textContent;
        const result = await spotify.search(searchString);
    }
</script>

<section id="search-section">
    <input id="spotify-search" type="search" />
    <button class="main-button" on:click={search}>Search</button>
</section>
<p id="search-results"></p>

<style>
    #search-section {
        display: flex;
    }

    #spotify-search {
        background-color: var(--c-spotify-black);
        border-color: var(--c-spotify-light-green);
        border-style: solid;
        color: white;
        font-family: 'Rubik', cursive;
        font-size: 2rem;
        width: 30rem;
    }

    #search-results {
        background-color: var(--c-spotify-black);
        color: white;
        font-size: 1rem;
    }
</style>