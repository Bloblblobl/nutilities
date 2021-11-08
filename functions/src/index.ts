import * as functions from 'firebase-functions';
import { request } from 'gaxios';

// https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
const spotifyClientID = functions.config().spotify.clientid;
const spotifyClientSecret = functions.config().spotify.clientsecret;

export const spotifyAuthorize = functions.https.onCall((data, context) => {
    const queryParameters = {
        client_id: spotifyClientID,
        response_type: 'code',
        redirect_uri: data?.baseRedirectURL ?? 'http://localhost:8080/',
    };

    const authURL: URL = new URL('https://accounts.spotify.com/authorize');
    authURL.search = new URLSearchParams(queryParameters).toString();
    return {
        redirectURL: authURL.toString(),
    };
});

export const spotifyRequestAccessToken = functions.https.onCall((data, context) => {
    const queryParameters = {
        grant_type: 'authorization_code',
        code: data.code,
        redirect_uri: data?.baseRedirectURL ?? 'http://localhost:8080/',
    };

    const tokenURL: URL = new URL('https://accounts.spotify.com/api/token');
    tokenURL.search = new URLSearchParams(queryParameters).toString();
    const spotifyIDSecret = spotifyClientID + ':' + spotifyClientSecret;
    const authorizationHeader = 'Basic ' + Buffer.from(spotifyIDSecret).toString('base64');
    return request({
        url: tokenURL.toString(),
        method: 'POST',
        headers: {
            'Authorization': authorizationHeader,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => response.data);
});
