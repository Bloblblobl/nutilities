<script>
    export let rows = 3;
    export let columns = 3;
</script>

{#each [...Array(rows).keys()] as i}
    <section>
        {#each [...Array(columns).keys()] as j}
            {#if i === j }
                <article></article>
            {:else}
                <article></article>
            {/if}
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

    article {
        border-radius: 0.5rem;
        cursor: pointer;
        background-color: var(--c-light-gray);
        width: 100%;
        height: 100%;
        opacity: 0.3;
        backdrop-filter: blur(1rem);
        filter: drop-shadow(0 0 0.1rem var(--c-light-gray));
        transition: 1s;
    }

    article:not(:last-child) {
        margin-right: 2rem;
    }

    article:hover {
        background-color: var(--c-mint);
        opacity: 0.5;
        transition: 0.5s;
    }
</style>