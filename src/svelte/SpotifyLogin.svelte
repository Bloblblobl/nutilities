<script>
    import * as spotify from '../ts/clients/spotify';
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParameters = Object.fromEntries(urlSearchParams.entries());
    console.log(queryParameters);
    if ('code' in queryParameters) {
        console.log('yes!');
    }
</script>

<button on:click={spotify.redirectToAuthorize}>Log In</button>

<style>
    button {
        box-sizing: border-box;

        margin: 1rem;

        background-color: greenyellow;

        font-size: 2rem;
        font-family: 'Lobster', cursive;

        /* border: solid 2px transparent; */
        border: none;
        border-radius: 0;

        cursor: pointer;
    }   

    button:hover {
        margin: calc(1rem - 5px);

        border: solid 5px green;
        /* border-color: green; */
    }
</style>