<script lang="ts">
    import CurrentDateControl from './CurrentDateControl.svelte';
    import AlbumCard from './AlbumCard.svelte';

    import { currentDate, datesToAlbumIDs } from '../ts/stores';

    $: dates = $currentDate.getDatesThisWeek();
</script>

<div id="calendar">
    <div id="date-control">
        <CurrentDateControl />
    </div>
    <div id="albums">
    {#each dates as date (date.toFormattedString('y-m-d'))}
        <!-- TODO: FIX {@const albumID = $datesToAlbumIDs[date.sortFormat] ?? null}-->
        <div>
            <p>{date.toFormattedString('m d')}</p>
            <AlbumCard albumID={$datesToAlbumIDs[date.toFormattedString('y-m-d')] ?? null}></AlbumCard>
        </div>
    {/each}
    </div>
</div>

<style>
    #calendar {
        display: flex;
        flex-direction: column;
    }

    #date-control {
        align-self: center;
        margin: 2rem;
    }

    #albums {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(15rem, max-content));
        justify-content: center;
        max-height: inherit;
        overflow: auto;
    }
</style>