import { app } from './firebase';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

const functions = getFunctions(app);
// const functions = getFunctions(app, 'http://localhost:5001');
// connectFunctionsEmulator(functions, 'localhost', 5001);

type SpotifyAuthorizeResponse = { redirectURL: string };
export const spotifyAuthorize = httpsCallable<unknown, SpotifyAuthorizeResponse>(
    functions,
    'spotifyAuthorize'
);

type SpotifyRequestAccessTokenResponse = {
    access_token: string,
    refresh_token: string,
};
export const spotifyRequestAccessToken = httpsCallable<unknown, SpotifyRequestAccessTokenResponse>(
    functions,
    'spotifyRequestAccessToken'
);