<script>
    const CLIENT_ID = '2695447ce34742739f2603051902493f';
    const redirectUri = window.location.href;

    const queryParameters = {
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: redirectUri,
    };
    let url = new URL('https://accounts.spotify.com/authorize');
    url.search = new URLSearchParams(queryParameters).toString();
    console.log('URL', url);

    const onClick = () => {
        window.location.href = url;
    }
</script>

<button on:click={onClick}>Log In</button>

<style>
    button {
        margin: 1rem;

        background-color: greenyellow;

        font-size: 2rem;
        font-family: 'Lobster', cursive;

        border: solid 5px transparent;
        border-radius: 0;

        cursor: pointer;
    }   

    button:hover {
        border-color: green;
    }
</style>