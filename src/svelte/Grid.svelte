<script lang="ts">
    import TrackCard from './TrackCard.svelte';

    export let rows: number = 3;
    export let columns: number = 3;
</script>

{#each [...Array(rows).keys()] as i}
    <section>
        {#each [...Array(columns).keys()] as j}
            <TrackCard index={columns * i + j}/>
        {/each}
    </section>
{/each}

<style>
    section {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 1rem;
        display: flex;
    }
</style>