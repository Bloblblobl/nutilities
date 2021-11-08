import { spotifyAuthorize, spotifyRequestAccessToken } from './functions';

function redirectToAuthorize() {
    const baseRedirectURL: string = window.location.origin + window.location.pathname;
    return spotifyAuthorize({ baseRedirectURL });
}

function requestAccessToken(code: string) {
    const baseRedirectURL: string = window.location.origin + window.location.pathname;
    return spotifyRequestAccessToken({ baseRedirectURL, code });
}

export {
    redirectToAuthorize,
    requestAccessToken,
};