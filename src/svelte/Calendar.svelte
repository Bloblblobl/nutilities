<script lang="ts">
    import * as spotify from '../ts/clients/spotify';

    let search = new Promise((resolve, _) => {
        resolve('Search for something ya nimrod!');
    });

    const onClick = () => {
        const spotifySearch: HTMLInputElement = document.querySelector('#spotify-search');
        search = spotify.search(spotifySearch.value);
    }

    const displaySearchResults = (searchResults) => {
        const exclude = ['available_markets'];
        const filterResults = (results) => {
            return Object.entries(results).reduce((acc, [key, value]) => {
                if (exclude.includes(key)) {
                    return acc;
                } else if (value !== null && typeof value === 'object') {
                    acc[key] = filterResults(value);
                } else {
                    acc[key] = value;
                }
                return acc;
            }, {});
        };
        return JSON.stringify(filterResults(searchResults), null, 4);
    }
</script>

<section id="search-section">
    <input id="spotify-search" type="search" />
    <button class="main-button" on:click={onClick}>Search</button>
</section>
<p id="search-results">
    {#await search}
        Searching...
    {:then searchResults} 
        {displaySearchResults(searchResults)}
    {:catch error}
        Search failed :(
        Error: {error}
    {/await}
</p>

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
        overflow: auto;
        white-space: pre;
    }
</style>