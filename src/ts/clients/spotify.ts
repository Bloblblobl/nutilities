import { db } from './db';
import { spotifyAuthorize, spotifyRequestAccessToken } from './functions';

const BASE_API_URL = 'https://api.spotify.com/v1/';
const REDIRECT_URI = window.location.origin + '/';

const SCOPES = [
    'user-read-recently-played',
];

async function redirectToAuthorize() {
    let scopes = SCOPES.join(' ');
    let response = await spotifyAuthorize({ redirectURI: REDIRECT_URI, scopes });
    return response;
}

type RequestAccessTokenParams = { code: string } | { refreshToken: string };
async function requestAccessToken(params: RequestAccessTokenParams) {
    if ('code' in params) {
        params['redirectURI'] = REDIRECT_URI;
    }
    let response = await spotifyRequestAccessToken(params);
    db.local.setItem('SpotifyAccessToken', response.data.access_token);
    if ('refresh_token' in response.data) {
        db.local.setItem('SpotifyRefreshToken', response.data.refresh_token);
    }
}

async function makeRequest(endpoint: string, method: string = 'GET') {
    const _makeRequest = async () => {
        const accessToken = db.local.getItem('SpotifyAccessToken');
        return await fetch(BASE_API_URL + endpoint, {
            method,
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
            }
        });
    }

    let response = await _makeRequest();

    // if we receive a 401 response, try to reauth using the refresh token then retry the request
    const refreshToken = db.local.getItem('SpotifyRefreshToken');
    if (response.status === 401 && refreshToken) {
        await requestAccessToken({ refreshToken });
        response = await _makeRequest();
    }

    return response.json();
}

async function search(searchString: string) {
    makeRequest('search');
}

export {
    redirectToAuthorize,
    requestAccessToken,
    makeRequest,
    search,
};