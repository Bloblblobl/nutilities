<script lang="ts">
    import CurrentDateControl from './CurrentDateControl.svelte';
    import AlbumCard from './AlbumCard.svelte';
    import SpotifySearch from './SpotifySearch.svelte';

    import { currentDate, datesToAlbumIDs } from '../ts/stores';
    import { NuDate } from '../ts/clients/temporal';
    import { db } from '../ts/clients/db';

    let selectedDate = null;
    $: dates = $currentDate.getDatesThisWeek();
    $: if (!dates.some(date => date.isEqual(selectedDate))) {
        selectedDate = null;
    }

    function selectDate() {
        selectedDate = new NuDate(`${this.parentElement.dataset.date}:`);
    }

    function selectAlbum() {
        if (selectedDate !== null) {
            const albumID = this.dataset.albumId;
            const dbKey = `test/spotify/thisweek/${selectedDate.toFormattedString('y-m-d')}`;
            db.realtime.set(dbKey, albumID);
        }
    }

    function clearAlbum() {
        const date = this.parentElement.parentElement.dataset.date;
        const unpaddedDate = NuDate.translateFormattedString(date, 'Py-m-d', 'y-m-d');
        const dbKey = `test/spotify/thisweek/${unpaddedDate}`;
        datesToAlbumIDs.update(dateToAlbumIDMap => ({...dateToAlbumIDMap, [unpaddedDate]: null}));
        db.realtime.set(dbKey, null);
    }
</script>

<main>
    <div id="calendar">
        <div id="date-control">
            <CurrentDateControl />
        </div>
        <div id="albums">
        {#each dates as date (date.toFormattedString('y-m-d'))}
            <!-- TODO: FIX {@const albumID = $datesToAlbumIDs[date.sortFormat] ?? null}-->
            <div 
                class:selected={date.isEqual(selectedDate)}
                data-date="{date.toFormattedString('Py-m-d')}"
            >
                <p>
                    {date.toFormattedString('m d')}
                    {#if $datesToAlbumIDs[date.toFormattedString('y-m-d')]}
                        <span on:click={clearAlbum}>Clear</span>
                    {/if}
                </p>
                <div on:click={selectDate}>
                    <AlbumCard albumID={$datesToAlbumIDs[date.toFormattedString('y-m-d')] ?? null} />
                </div>
            </div>
        {/each}
        </div>
    </div>
    <div id="search-container">
        <SpotifySearch onAlbumClick={selectAlbum} />
    </div>
</main>

<style>
    [data-date] > div {
        border: solid 2px transparent;
        border-radius: 0.5rem;
        cursor: pointer;
        margin-bottom: 0.5rem;
    }

    span {
        color: hsl(0 100% 70%);
        cursor: pointer;
        font-size: 0.9rem;
        margin-left: 1rem;
    }

    .selected > div {
        border: solid 2px var(--c-mint);
    }

    .selected > p {
        color: var(--c-mint);
        font-weight: bold;
    }

    main {
        --calendar-height: 25rem;
    }

    #calendar {
        display: flex;
        flex-direction: column;
        height: var(--calendar-height);
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
        overflow: auto;
    }

    #albums > div {
        display: flex;
        flex-direction: column;
    }

    #albums > div > p {
        align-items: flex-end;
        display: flex;
        justify-content: space-between;
    }

    #albums > div > p > span {
        margin-right: 2rem;
    }


    #search-container {
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--calendar-height));
    }
</style>