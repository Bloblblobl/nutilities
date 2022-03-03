<script lang="ts">
    import CurrentDateControl from './CurrentDateControl.svelte';
    import AlbumCard from './AlbumCard.svelte';

    import { currentDate, datesToAlbumIDs } from '../ts/stores';
    import { getDatesThisWeek } from '../ts/clients/temporal';


    $: dates = getDatesThisWeek($currentDate);
</script>

<CurrentDateControl />
<section>
{#each dates as date (date.sortFormat)}
    {@const albumID = $datesToAlbumIDs[date.sortFormat] ?? null}
    <div>
        <p>{date.displayFormat}</p>
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