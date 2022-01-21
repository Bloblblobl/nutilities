<script lang="ts">
    import { db } from '../ts/clients/db';
    import { getDatesThisWeek } from "../ts/clients/temporal";
    import AlbumCard from './AlbumCard.svelte';

    let d = new Date();
    const dates = getDatesThisWeek(d);

    const getAlbums = async () => {
        const dateAlbumMap = {};
        for (const date of dates) {
            const dbKey = `test/spotify/thisweek/${date.sortFormat}`;
            dateAlbumMap[date.sortFormat] = await db.realtime.get(dbKey);
        }
        return dateAlbumMap;
    }
</script>

<section>
{#await getAlbums()}
    <p>Loading</p>
{:then dateAlbumMap}
    {#each dates as date}
        <div>
            <p>{date.displayFormat}</p>
            <AlbumCard albumID={dateAlbumMap[date.sortFormat]}></AlbumCard>
        </div>
    {/each}
{/await}
</section>

<style>
    section {
        display: flex;
    }

    section div:not(:last-of-type) {
        margin-right: 2rem;
    }
</style>