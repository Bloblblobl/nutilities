<script lang="ts">
    import * as spotify from '../ts/clients/spotify';
    import { spotifySearchOptions, spotifySearchResults } from '../ts/stores';

    const search = async () => {
        const spotifySearch: HTMLInputElement = document.querySelector('input[type="search"]');
        const searchResults = await spotify.search(spotifySearch.value, $spotifySearchOptions);
        $spotifySearchResults = searchResults;
    }
</script>

<div id="search-bar-container">
    <div id="search-bar">
        <input type="search" />
        <button class="main-button" on:click={search}>Search</button>
    </div>
    <div id="options">
        <div>
            {#each spotify.ITEM_TYPES as itemType}
            <label>
                <input 
                    type="checkbox"
                    value="{itemType}"
                    bind:group="{$spotifySearchOptions.types}"
                />
                {itemType}s
            </label>
            {/each}
        </div>
        <div>
            <label>
                Count
                <input type="number" bind:value={$spotifySearchOptions.count} />
            </label>
            <label>
                Offset
                <input type="number" bind:value={$spotifySearchOptions.offset} />
            </label>
        </div>
    </div>
</div>

<style>
    #search-bar-container {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }

    #search-bar {
        display: flex;
    }

    #options {
        display: flex;
        margin-block: 0.5rem;
    }

    #options > div {
        display: flex;
        flex-direction: column;
        margin-right: 1rem;
    }

    label {
        text-transform: capitalize;
    }

    input[type="search"] {
        background-color: var(--c-spotify-black);
        border-color: var(--c-spotify-light-green);
        border-style: solid;
        color: white;
        font-family: 'Rubik', cursive;
        font-size: 2rem;
        width: 30rem;
    }
</style>