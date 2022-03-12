<script lang="ts">
    import AlbumCard from './AlbumCard.svelte';
    import SpotifySearchBar from './SpotifySearchBar.svelte';
    import { spotifySearchOptions, spotifySearchResults } from '../ts/stores';

    export let onAlbumClick = () => {};
    let visualDisplay = true;
    $: displayingAlbums = $spotifySearchOptions.types.includes('album');
    $: canShow = typeof $spotifySearchResults === 'object' && displayingAlbums;
    $: jsonResults = JSON.stringify($spotifySearchResults ?? {}, null, 4);
    $: albumDataMap = $spotifySearchResults?.['albums'] ?? null;
</script>

<SpotifySearchBar />
<label>
    <input type="checkbox" name="display" bind:checked={visualDisplay}/> Visual Display
</label>
<div id="search-results">
    {#if $spotifySearchResults !== null}
        {#if visualDisplay && canShow}
            <div id="visual-results">
                {#each Object.entries(albumDataMap) as [albumID, albumData] (albumID)}
                    <div on:click={onAlbumClick} data-album-id={albumID}>
                        <AlbumCard albumID={albumID} albumData={albumData}/>
                    </div>
                {/each}
            </div>
        {:else}
            <p id="json-results">{jsonResults}</p>
        {/if}
    {:else}
        <p>No results... search for something!</p>
    {/if}
</div>

<style>
    label {
        margin: 1rem;
    }

    p {
        margin-block: 0;
    }

    #search-results {
        --album-card-size: 12rem;
        --album-image-size: 7rem;

        background-color: var(--c-spotify-black);
        display: flex;
        flex-grow: 1;
        font-size: 1rem;
        overflow: auto;
        white-space: pre;
    }

    #search-results > p:not(#json-results) {
        align-self: center;
        margin: auto;
    }

    #visual-results {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
    }

    #visual-results > div {
        cursor: pointer;
    }

    #json-results {
        justify-self: flex-start;
    }
</style>