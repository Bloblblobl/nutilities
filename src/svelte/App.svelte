<script lang="ts">
    import Grid from './Grid.svelte';
    import TopBar from './TopBar.svelte';
    export let name: string;
</script>

<TopBar {name}/>
<main>
    <Grid rows={5} columns={10}/>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

    :root {
        --topbar-height: 4rem;

        --c-light-gray: #b5bec6;
        --c-dark-gray: #2b2d42;
        --c-yellow: #f4e04d;
        --c-mint: #8be8cb;
    }

    :global(html, body) {
        width: 100%;
        height: 100%;

        margin: 0;
    }

    main {
        padding: 1rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        height: calc(100% - var(--topbar-height));
        background-color: var(--c-dark-gray);
    }
</style>