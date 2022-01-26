<script lang="ts">
    import { db } from '../ts/clients/db';
    import { getDatesThisWeek, getDateString } from "../ts/clients/temporal";
    import AlbumCard from './AlbumCard.svelte';

    let d = new Date();
    const dateString = getDateString(d);
    $: dates = getDatesThisWeek(d);
    $: dateAlbumMap = getAlbums(dates);

    // append colon so that the date is created with correct locale settings
    const setDate = (e) => d = new Date(`${e.target.value}:`);

    const getAlbums = async (dates) => {
        const dateAlbumMap = {};
        for (const date of dates) {
            const dbKey = `test/spotify/thisweek/${date.sortFormat}`;
            dateAlbumMap[date.sortFormat] = await db.realtime.get(dbKey);
        }
        return dateAlbumMap;
    }
</script>

<input type="date" on:change={setDate} value="{dateString}"/>
<section>
{#await dateAlbumMap}
    <p>Loading</p>
{:then m}
    {#each dates as date}
        <div>
            <p>{date.displayFormat}</p>
            <AlbumCard albumID={m[date.sortFormat]}></AlbumCard>
        </div>
    {/each}
{/await}
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