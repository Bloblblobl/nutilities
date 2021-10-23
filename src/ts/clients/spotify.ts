const CLIENT_ID: string = '2695447ce34742739f2603051902493f';

function redirectToAuthorize() {
    const queryParameters = {
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: window.location.href,
    };

    let authURL: URL = new URL('https://accounts.spotify.com/authorize');
    authURL.search = new URLSearchParams(queryParameters).toString();
    window.location.href = authURL.toString();

}

export {
    redirectToAuthorize,
};