<script lang="ts">
    import CurrentDateControl from './CurrentDateControl.svelte';
    import AlbumCard from './AlbumCard.svelte';

    import { db } from '../ts/clients/db';
    import * as spotify from '../ts/clients/spotify';
    import { currentDate } from '../ts/stores';

    let searchPromise = null;
    let visualDisplay = true;
    let searchTypes = ['track', 'album', 'artist'];
    let selectedSearchTypes = 
        JSON.parse(db.local.get('spotify:selected-search-types')) ?? [...searchTypes];

    $: datesThisWeek = $currentDate.getDatesThisWeek();
    let selectedDate = datesThisWeek?.[0].toFormattedString('y-m-d');

    const search = () => {
        const spotifySearch: HTMLInputElement = document.querySelector('#spotify-search');
        searchPromise = spotify.search(spotifySearch.value, selectedSearchTypes);
        db.local.set('spotify:selected-search-types', JSON.stringify(selectedSearchTypes));
    }

    const setAADAlbum = async (e) => {
        const albumID = e.target.value;
        const dbKey = `test/spotify/thisweek/${selectedDate}`;
        await db.realtime.set(dbKey, albumID);
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

<div id="search-section">
    <div id="search-box">
        <input id="spotify-search" type="search" />
        <button class="main-button" on:click={search}>Search</button>
    </div>
    <div id="search-options">
        <div id="search-types">
            {#each searchTypes as searchType}
            <label>
                <input type="checkbox" value="{searchType}" bind:group="{selectedSearchTypes}"/>
                {searchType}s
            </label>
            {/each}
        </div>
        <div id="search-display">
            <label>
                <input type="checkbox" name="display" bind:checked={visualDisplay}/> Visual Display
            </label>
        </div>
        <div id="aad-date">
            <CurrentDateControl />
            <div id="aad-date-picker">
                {#each datesThisWeek as date}
                    <label>
                        <input type="radio" value="{date.toFormattedString('y-m-d')}" bind:group="{selectedDate}"/>
                        <span>{date.toFormattedString('m/d/y')}</span>
                    </label>
                {/each}
            </div>
        </div>
    </div>
</div>
<div id="search-results">
    {#if searchPromise !== null}
        {#await searchPromise}
            <p>Searching...</p>
        {:then searchResults}
            {#if visualDisplay && typeof searchResults === 'object' && 'albums' in searchResults}
                <div id="visual-results">
                    {#each Object.entries(searchResults['albums']) as [albumID, albumData]}
                        <div class="album-container">
                            <AlbumCard albumID={albumID} albumData={albumData}/>
                            <button class="main-button" value="{albumID}" on:click={setAADAlbum}>
                                Set as AAD
                            </button>
                        </div>
                    {/each}
                </div>
            {:else}
                <p>{displaySearchResults(searchResults)}</p>
            {/if}
        {:catch error}
            <p>Search failed :(</p>
            <p>Error: {error}</p>
        {/await}
    {:else}
        <p>No results... search for something!</p>
    {/if}
</div>

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

    #aad-date {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
    }

    #aad-date-picker {
        display: flex;
    }

    #aad-date-picker label {
        align-items: center;
        display: flex;
    }

    #aad-date-picker label input {
        display: none;
    }

    #aad-date-picker label span {
        cursor: pointer;
        padding: 0.5rem;
    }

    #aad-date-picker label input:checked + span {
        border: solid 1px white;
    }

    label {
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
        align-items: center;
        background-color: var(--c-spotify-black);
        display: flex;
        font-size: 1rem;
        height: 100%;
        justify-content: center;
        overflow: auto;
        white-space: pre;
    }

    #visual-results {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
    }

    .album-container {
        border: solid 1px white;
        display: flex;
        flex-direction: column;
        margin: 1rem;
        padding: 1rem;
    }
</style>