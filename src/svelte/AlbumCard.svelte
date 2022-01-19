<script lang="ts">
    import { Album } from "../ts/clients/spotify";

    export let albumID: string = '';
    export let albumData: any = null;
    let album = null;

    if (albumID) {
        album = new Album(albumID, albumData);
    }
</script>

<article>
    {#if album === null}
        <p>Album not found.</p>
    {:else}
        {#await album.initialize()}
            <p>Fetching album data...</p>
        {:then}
            <img src="{album.imageURL}" alt="Album cover for {album.name} by {album.artistName}" />
            <p class="title">{album.name}</p>
            <p class="artist">{album.artistName}</p>
        {:catch error}
            <p>Album not found.</p>
            <p>Error: {error}</p>
        {/await}
    {/if}    
</article>

<style>
article {
    align-items: center;
    background-color: var(--c-spotify-black);
    border-radius: 0.5rem;
    color: white;
    display: flex;
    flex-direction: column;
    height: 15rem;
    justify-content: center;
    width: 15rem;
}

img {
    width: 10rem;
    height: 10rem;
}

p {
    margin-block: 0;
    max-width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.title {
    margin-top: 0.5rem;
}

.artist {
    font-size: 0.8rem;
    margin-block: 0.5rem;
}
</style>