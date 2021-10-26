import { FirebaseApp, initializeApp } from 'firebase/app';

export const app: FirebaseApp = initializeApp({
	apiKey: 'AIzaSyDLXxIOCbY3_ky3tUfvsQRYIADuf6j_1Z0',
    authDomain: 'saar-nutilities.firebaseapp.com',
    databaseURL: 'https://saar-nutilities-default-rtdb.firebaseio.com',
    projectId: 'saar-nutilities',
    storageBucket: 'saar-nutilities.appspot.com',
    messagingSenderId: '778902210170',
    appId: '1:778902210170:web:26f18b2a7ccaf65b531dc3',
    measurementId: 'G-4Y0QD0FZ07',
});