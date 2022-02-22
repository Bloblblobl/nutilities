<script lang="ts">
    import { aadAlbums } from '../ts/stores';
    import AADDateControl from './AADDateControl.svelte';
    import AlbumCard from './AlbumCard.svelte';

    $: currentAlbums = Object.entries($aadAlbums.current) as [string, string][];
</script>

<AADDateControl />
<section>
{#each currentAlbums as [date, albumID] (date)}
    <div>
        <p>{date}</p>
        <AlbumCard albumID={albumID}></AlbumCard>
    </div>
{/each}
</section>

<style>
    section {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, max-content));
        justify-content: center;
        max-height: inherit;
        overflow: auto;
    }
</style>