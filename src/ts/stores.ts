import type { DataSnapshot } from 'firebase/database';
import { writable } from 'svelte/store';
import { db } from './clients/db';
import * as spotify from './clients/spotify';
import { NuDate } from './clients/temporal';

const createDateStore = (initialValue) => {
    const store = writable(initialValue);
    const changeDate = (deltaDays) => {
        store.update(date => {
            date.setDate(date.getDate() + deltaDays);
            return date;     
        });
    };
    return {
        ...store,
        changeDate,
        previousWeek: () => changeDate(-7),
        nextWeek: () => changeDate(7),
    }
}

const createSpotifySearchOptionsStore = () => {
    const localOptions = JSON.parse(db.local.get('spotify:search-options'));
    const defaultOptions = {
        types: [...spotify.ITEM_TYPES],
        count: 20,
        offset: 0,
        exclude: ['available_markets'],
    }
    const store = writable(localOptions ?? defaultOptions);
    return {
        ...store,
        set: (newOptions: spotify.SearchOptions) => {
            console.log('options change!', newOptions);
            db.local.set('spotify:search-options', JSON.stringify(newOptions));
            store.set(newOptions);
        }
    }
}

const setupDateToAlbumIDs = () => {
    db.realtime.on('test/spotify/thisweek', (snapshot: DataSnapshot) => {
        const dates = snapshot.val();
        for (const [date, albumID] of Object.entries(dates)) {
            datesToAlbumIDs.update(dateToAlbumIDMap => ({...dateToAlbumIDMap, [date]: albumID}));
        }
    });
};

setupDateToAlbumIDs();



export const route = writable('/');
export const recentlyPlayed = writable({});
export const currentDate = createDateStore(new NuDate());
export const albums = writable({});
export const datesToAlbumIDs = writable({});
export const spotifySearchResults = writable(null);
export const spotifySearchOptions = createSpotifySearchOptionsStore();