<script>
    export let name;
</script>

<main>
    <h1>Hello, {name}!</h1>
</main>

<style>
    :global(body, html) {
        width: 100%;
        height: 100%;

        margin: 0;
    }

    main {
        width: 100%;
        height: 100%;

        background-color: aqua;
    }

    h1 {
        margin: 0;
        
        color: blue;
    }
</style>