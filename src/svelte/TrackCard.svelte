<script lang="ts">
    import { recentlyPlayed } from '../ts/stores';
    import logo512 from '../img/logo/512x512.png';

    export let index: number = 0;

    let track = {
        src: logo512,
        name: 'Loading...'
    };
    
    $: {
        let items = $recentlyPlayed?.items;
        if (items !== undefined) {
            let item = items[index].track;
            track.src = item.album.images[0].url;
            track.name = item.name;
        }
    }
</script>

<article>
    <img src={track.src} alt="{track.name}">
    <p>{track.name}</p>
</article>

<style>
    article {
        backdrop-filter: blur(1rem);
        background-color: var(--c-spotify-black);
        border-radius: 0.5rem;
        cursor: pointer;
        display: flex;
        filter: drop-shadow(0 0 0.1rem var(--c-spotify-black));
        flex-direction: column;
        height: 100%;
        opacity: 0.3;
        transition: 1s;
        width: 100%;
    }

    article:not(:last-child) {
        margin-right: 2rem;
    }

    article:hover {
        opacity: 1;
        transition: 0.5s;
    }

    img {
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        max-height: 5rem;
        object-fit: cover;
    }

    p {
        color: white;
        font-family: 'Rubik', cursive;
        font-weight: 300;
        margin: auto;
        text-align: center;
        vertical-align: middle;
    }
</style>