<script lang="ts">
    import { Album } from "../ts/clients/spotify";
    import { hoverScrollText } from "../ts/actions";
    import { albums } from "../ts/stores";

    export let albumID: string = '';
    export let albumData: any = null;

    if (albumID && !(albumID in $albums)) {
        $albums[albumID] = new Album(albumID, albumData);
    }

    $: album = $albums[albumID] ?? null;

</script>

<article>
    {#if album === null}
        <p>Album not found.</p>
    {:else if album.data === null}
        {#await album.getData()}
            <p>Fetching album data...</p>
        {:then}
            <img src="{album.imageURL}" alt="Album cover for {album.name} by {album.artistName}" />
            <p class="title" use:hoverScrollText><span>{album.name}</span></p>
            <p class="artist" use:hoverScrollText><span>{album.artistName}</span></p>
        {:catch error}
            <p>Album not found.</p>
            <p>Error: {error}</p>
        {/await}
    {:else}
        <img src="{album.imageURL}" alt="Album cover for {album.name} by {album.artistName}" />
        <p class="title" use:hoverScrollText><span>{album.name}</span></p>
        <p class="artist" use:hoverScrollText><span>{album.artistName}</span></p>
    {/if}    
</article>

<style>
article {
    align-items: center;
    background-color: var(--c-spotify-black);
    border-radius: 0.5rem;
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
    transition-timing-function: linear;
    margin-block: 0;
    max-width: 90%;
    overflow: hidden;
    position: relative;
    white-space: nowrap;
}

span {
    display: inline-block;
}

.title {
    margin-top: 0.5rem;
}

.artist {
    font-size: 0.8rem;
    margin-block: 0.5rem;
}
</style>