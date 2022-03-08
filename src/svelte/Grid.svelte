<script lang="ts">
    import TrackCard from './TrackCard.svelte';

    export let rows: number = 3;
    export let columns: number = 3;
</script>

<main>
{#each [...Array(rows).keys()] as i}
    <div>
        {#each [...Array(columns).keys()] as j}
            <TrackCard index={columns * i + j}/>
        {/each}
    </div>
{/each}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
    }

    div {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: flex;
    }
</style>