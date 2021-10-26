import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onCall((data, context) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  return {
    text: 'Hello from Firebase!',
  };
});

export const spotifyAuthorize = functions.https.onCall((data, context) => {
  const queryParameters = {
    client_id: functions.config().spotify.clientid,
    response_type: 'code',
    redirect_uri: data?.baseRedirectURL ?? 'http://localhost:8080/',
  };

  const authURL: URL = new URL('https://accounts.spotify.com/authorize');
  authURL.search = new URLSearchParams(queryParameters).toString();
  return {
    redirectURL: authURL.toString(),
  };
});
