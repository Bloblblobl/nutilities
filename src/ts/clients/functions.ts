import { app } from './firebase';
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const functions = getFunctions(app);
// const functions = getFunctions(app, 'http://localhost:5001');
// connectFunctionsEmulator(functions, 'localhost', 5001);

export const helloWorld = httpsCallable(functions, 'helloWorld');
export const spotifyAuthorize = httpsCallable<unknown, { redirectURL: string }>(
    functions,
    'spotifyAuthorize'
);