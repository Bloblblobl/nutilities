<script lang="ts">
    import CurrentDateControl from './CurrentDateControl.svelte';
    import AlbumCard from './AlbumCard.svelte';
    import SpotifySearch from './SpotifySearch.svelte';

    import { currentDate, datesToAlbumIDs } from '../ts/stores';
    import { NuDate } from '../ts/clients/temporal';
    import { db } from '../ts/clients/db';

    let selectedDate = null;
    $: populated = Object.keys($datesToAlbumIDs).length > 0;
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
    <div id="calendar" class:shrink={selectedDate !== null}>
        <div id="date-control">
            <CurrentDateControl />
        </div>
        <div id="albums">
        {#each dates as date (`${date.toFormattedString('y-m-d')}-${populated}`)}
            <!-- TODO: FIX {@const albumID = $datesToAlbumIDs[date.sortFormat] ?? null}-->
            <div 
                class:selected={date.isEqual(selectedDate)}
                data-date="{date.toFormattedString('Py-m-d')}"
            >
                <p>
                    {date.toFormattedString('m d')}
                    {#if $datesToAlbumIDs[date.toFormattedString('y-m-d')]
                         && date.isEqual(selectedDate)
                    }
                        <span on:click={clearAlbum}>Clear</span>
                    {/if}
                </p>
                <AlbumCard
                    albumID={$datesToAlbumIDs[date.toFormattedString('y-m-d')] ?? null}
                    selected={date.isEqual(selectedDate)}
                    onClick={selectDate}
                />
            </div>
        {/each}
        </div>
    </div>
    {#if selectedDate !== null}
    <div id="search-container">
        <SpotifySearch onAlbumClick={selectAlbum} />
    </div>
    {/if}
</main>

<style>
    main {
        --calendar-height: 20rem;
        --album-card-size: 12rem;
        --album-image-size: 7rem;
    }

    span {
        color: hsl(0 100% 70%);
        cursor: pointer;
        font-size: 0.9rem;
        margin-left: 1rem;
    }

    .selected > p {
        color: var(--c-mint);
        font-weight: bold;
    }

    #albums {
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(var(--album-card-size), max-content));
        justify-content: center;
        overflow: auto;
        padding-bottom: 1rem;
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

    #calendar {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    #calendar.shrink {
        height: var(--calendar-height);
    }

    #date-control {
        align-self: center;
        margin: 1rem 0 0;
    }

    #search-container {
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--calendar-height));
    }
</style>