<script lang="ts">
    import logo512 from '../img/logo/512x512.png';

    export let rows: number = 3;
    export let columns: number = 3;
</script>

{#each [...Array(rows).keys()] as i}
    <section>
        {#each [...Array(columns).keys()] as j}
            <article>
                <img src="{logo512}" alt="{i}, {j}">
            </article>
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
        display: flex;
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
        opacity: 1;
        transition: 0.5s;
    }

    article img {
        max-height: 5rem;
        margin: auto;
    }
</style>