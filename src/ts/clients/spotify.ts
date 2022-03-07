import { db } from './db';
import { spotifyAuthorize, spotifyRequestAccessToken } from './functions';

export type ItemType = typeof ITEM_TYPES[number];
export type SearchOptions = {
    types: ItemType[],
    count: number,
    offset: number,
    exclude: string[],
}

const BASE_API_URL = 'https://api.spotify.com/v1/';
const REDIRECT_URI = window.location.origin + '/';
const ITEM_TYPES = ['track', 'album', 'artist'] as const;

const SCOPES = [
    'user-read-recently-played',
];

class Album {
    albumID: string;
    spotifyURI: string;
    dbKey: string;
    data: any;

    constructor(albumID: string, albumData: any = null) {
        this.albumID = albumID;
        this.spotifyURI = `spotify:album:${albumID}`;
        this.dbKey = `test/spotify/albums/${this.albumID}`;
        this.data = albumData;
    }

    async getData() {
        if (this.data === null) {
            this.data = JSON.parse(await db.realtime.get(this.dbKey));
        }
        if (this.data === null) {
            this.data = await makeRequest(`albums/${this.albumID}`);
        }
        if (this.data !== null) {
            await db.realtime.set(this.dbKey, JSON.stringify(this.data));
        }
    }

    get name(): string {
        return this.data?.name ?? '';
    }

    get artistName(): string {
        return this.data?.artists?.[0]?.name ?? '';
    }

    get imageURL(): string {
        return this.data?.images?.[0]?.url ?? '';
    }
}

async function redirectToAuthorize() {
    let scopes = SCOPES.join(' ');
    let response = await spotifyAuthorize({ redirectURI: REDIRECT_URI, scopes });
    return response;
}

async function requestAccessToken(params: {code: string} | {refreshToken: string}) {
    if ('code' in params) {
        params['redirectURI'] = REDIRECT_URI;
    }
    let response = await spotifyRequestAccessToken(params);
    db.local.set('spotify:access-token', response.data.access_token);
    if ('refresh_token' in response.data) {
        db.local.set('spotify:refresh-token', response.data.refresh_token);
    }
}

async function makeRequest(endpoint: string, method: string = 'GET') {
    const _makeRequest = async () => {
        const accessToken = db.local.get('spotify:access-token');
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
    const refreshToken = db.local.get('spotify:refresh-token');
    if (response.status === 401 && refreshToken) {
        await requestAccessToken({ refreshToken });
        response = await _makeRequest();
    }

    return response.json();
}

function filterSearchResults(searchResults, exclude) {
    let filteredResults = {...searchResults};
    if ('albums' in filteredResults) {
        filteredResults = {
            albums: filteredResults.albums.items.reduce((result, album) => {
                result[album.id] = album;
                return result;
            }, {}),
        };
    }

    const recursiveFilter = (searchResults) => {
        return Object.entries(searchResults).reduce(
            (result, [key, value]) => {
                if (exclude.includes(key)) {
                    return result;
                } else if (value !== null && typeof value === 'object') {
                    result[key] = recursiveFilter(value);
                } else {
                    result[key] = value;
                }
                return result;
            },
            {}
        );
    };

    if (exclude.length > 0) {
        filteredResults = recursiveFilter(filteredResults);
    }

    return filteredResults;
}

async function search(searchString: string, options: SearchOptions) {
    // manually construct the queryString instead of using new URLSearchParams() because
    // URLSearchParams automatically URL encodes the values in the object, and spotify
    // expects the type parameter to maintain the commas unencoded
    const queryParameters = {
        q: searchString,
        type: Array.from(options.types).join(','),
        limit: options.count,
        offset: options.offset,
    }
    const queryString = Object.entries(queryParameters).reduce((result, [key, value]) => {
        return [...result, `${key.toString()}=${value.toString()}`];
    }, []).join('&');

    const rawResults = await makeRequest(`search?${queryString}`);
    return filterSearchResults(rawResults, options.exclude);
}

export {
    Album,
    redirectToAuthorize,
    requestAccessToken,
    makeRequest,
    search,
    ITEM_TYPES,
};