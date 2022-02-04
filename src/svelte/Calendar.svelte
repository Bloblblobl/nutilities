<script lang="ts">
    import { getDateString } from "../ts/clients/temporal";
    import { aadDate, aadAlbums } from '../ts/stores';

    import AlbumCard from './AlbumCard.svelte';

    // append colon so that the date is created with correct locale settings
    const setDate = (e) => aadDate.set(new Date(`${e.target.value}:`));
    $: currentAlbums = Object.entries($aadAlbums.current) as [string, string][];
</script>

<input type="date" on:change={setDate} value="{getDateString($aadDate)}"/>
<section>
{#each currentAlbums as [date, albumID] (date)}
    <div>
        <p>{date}</p>
        <AlbumCard albumID={albumID}></AlbumCard>
    </div>
{/each}
</section>

<style>
    input[type="date"] {
        align-self: center;
        max-width: 15rem;
    }

    section {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, max-content));
        justify-content: center;
        max-height: inherit;
        overflow: auto;
    }
</style>