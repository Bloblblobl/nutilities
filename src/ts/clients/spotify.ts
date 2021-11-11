import { db } from './db';
import { spotifyAuthorize, spotifyRequestAccessToken } from './functions';

const BASE_API_URL = 'https://api.spotify.com/v1/';

async function redirectToAuthorize() {
    const baseRedirectURL: string = window.location.origin + window.location.pathname;
    let response = await spotifyAuthorize({ baseRedirectURL });
    return response;
}

async function requestAccessToken(code: string) {
    const baseRedirectURL: string = window.location.origin + window.location.pathname;
    let response = await spotifyRequestAccessToken({ baseRedirectURL, code });
    db.local.setItem('SpotifyAccessToken', response.data.access_token);
    db.local.setItem('SpotifyRefreshToken', response.data.refresh_token);
}

async function makeRequest(endpoint: string, method: string) {
    const accessToken = db.local.getItem('SpotifyAccessToken');
    const response = await fetch(BASE_API_URL + endpoint, {
        method,
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    });
    return response.json();
}

export {
    redirectToAuthorize,
    requestAccessToken,
    makeRequest,
};