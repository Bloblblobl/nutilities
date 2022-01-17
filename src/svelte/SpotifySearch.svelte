<script lang="ts">
    import AlbumCard from './AlbumCard.svelte';

    import { db } from '../ts/clients/db';
    import * as spotify from '../ts/clients/spotify';

    let search = new Promise((resolve, _) => { resolve(''); });

    let searchTypes = ['track', 'album', 'artist'];
    let selectedSearchTypes = 
        JSON.parse(db.local.getItem('spotify:selected-search-types')) ?? [...searchTypes];

    let visualDisplay = true;

    const onClick = () => {
        const spotifySearch: HTMLInputElement = document.querySelector('#spotify-search');
        search = spotify.search(spotifySearch.value, selectedSearchTypes);
        db.local.setItem('spotify:selected-search-types', JSON.stringify(selectedSearchTypes));
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
    <div id="search-box">
        <input id="spotify-search" type="search" />
        <button class="main-button" on:click={onClick}>Search</button>
    </div>
    <div id="search-options">
        <div id="search-types">
            {#each searchTypes as searchType}
            <label>
                <input type="checkbox" value="{searchType}" bind:group="{selectedSearchTypes}" />
                {searchType}s
            </label>
            {/each}
        </div>
        <div id="search-display">
            <label>
                <input type="checkbox" name="display" bind:checked={visualDisplay}/> Visual Display
            </label>
        </div>
    </div>
</section>
<section id="search-results">
    {#await search}
        <p>Searching...</p>
    {:then searchResults}
        {#if visualDisplay && typeof searchResults === 'object' && 'albums' in searchResults}
            <div id="visual-results">
                {#each searchResults['albums'].items as album}
                    <AlbumCard albumID={album['id']}/>
                {/each}
            </div>
        {:else}
            <p>{displaySearchResults(searchResults)}</p>
        {/if}
    {:catch error}
        <p>Search failed :(</p>
        <p>Error: {error}</p>
    {/await}
</section>

<style>
    #search-section {
        display: flex;
        flex-direction: column;
    }

    #search-box {
        display: flex;
    }

    #search-options {
        display: flex;
        margin-block: 0.5rem;
    }

    #search-types {
        display: flex;
        flex-direction: column;
    }

    label {
        color: white;
        text-transform: capitalize;
    }

    p {
        margin-block: 0;
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

    #visual-results {
        display: flex;
        flex-flow: wrap;
    }
</style>