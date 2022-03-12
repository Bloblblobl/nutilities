<script lang="ts">
    import { Album } from "../ts/clients/spotify";
    import { hoverScrollText } from "../ts/actions";
    import { albums } from "../ts/stores";

    export let albumID: string = '';
    export let albumData: any = null;
    export let selected: boolean = false;
    export let onClick = () => {};
    let listened = false;
    
    if (albumID && !(albumID in $albums)) {
        $albums[albumID] = new Album(albumID, albumData);
    }

    $: album = $albums[albumID] ?? null;
    
    function setStatus(e: Event, album: Album) {
        e.stopPropagation();
        album.listened = !album.listened;
        listened = album.listened;
    }

   async function load(album: Album) {
       await album.getData();
       listened = album.listened;
   }
</script>

<div class:selected class:listened on:click={onClick}>
    {#if album === null}
        <p>Album not found.</p>
    {:else}
        {#await load(album)}
            <p>Fetching album data...</p>
        {:then}
            <span class="status" on:click={e => setStatus(e, album)}>►</span>
            <img src="{album.imageURL}" alt="Album cover for {album.name} by {album.artistName}" />
            <a href="{album.spotifyURI}">
                <p class="title" use:hoverScrollText><span>{album.name}</span></p>
            </a>
            <p class="artist" use:hoverScrollText><span>{album.artistName}</span></p>
        {:catch error}
            <p>Album not found.</p>
            <p>Error: {error}</p>
        {/await}
    {/if}
</div>

<style>
    a {
        color: inherit;
        margin-top: 0.5rem;
        max-width: 90%;
    }

    a:hover {
       box-shadow: var(--c-spotify-light-green) 0 0 3px;
    }

    div {
        align-items: center;
        background-clip: padding-box;
        background-color: var(--c-spotify-black);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        height: var(--album-card-size);
        justify-content: center;
        margin: 0.2rem;
        position: relative;
        width: var(--album-card-size);
    }

    img {
        width: var(--album-image-size);
        height: var(--album-image-size);
    }

    p {
        transition-timing-function: linear;
        margin-block: 0;
        overflow: hidden;
        position: relative;
        white-space: nowrap;
    }
    
    span {
        display: inline-block;
    }

    .artist {
        font-size: 0.8rem;
        margin-block: 0.5rem;
        max-width: 90%;
    }

    .listened {
        box-shadow: var(--c-spotify-light-green) 0 0 1rem;
    }

    .listened .status {
        background: conic-gradient(
            var(--c-yellow),
            var(--c-spotify-light-green),
            var(--c-yellow)
        );
        color: var(--c-spotify-black);
    }

    .listened .status:hover {
        color: white;
    }

    :not(.listened) .status {
        color: rgba(255, 255, 255, 0);
    }

    :not(.listened) .status:hover {
        background-color: rgba(255, 255, 255, 0.2);
        color: rgba(255, 255, 255, 0.5);
    }

    :not(.listened).selected .status {
        color: rgba(255, 255, 255, 0.5);
    }

    .selected {
        border: solid 0.2rem var(--c-mint);
        margin: 0;
    }

    .selected .status {
        border: solid 0.2rem var(--c-mint);
        right: -0.2rem;
        top: -0.2rem;
    }

    .status {
        border-bottom-left-radius: 1rem;
        height: 2rem;
        line-height: 2rem;
        position: absolute;
        right: 0;
        text-align: center;
        top: 0;
        width: 2rem;
    }
</style>