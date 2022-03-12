import type { DataSnapshot } from 'firebase/database';
import { writable } from 'svelte/store';
import { db } from './clients/db';
import * as spotify from './clients/spotify';
import { NuDate } from './clients/temporal';

const createRouteStore = () => {
    let initialValue = db.local.get('nutilities:route') ?? '/';
    const store = writable(initialValue);
    const set = (route: string) => {
        db.local.set('nutilities:route', route);
        store.set(route);
    };
    return {
        ...store,
        set,
    };
}

const createDateStore = () => {
    let initialValue = new NuDate(db.local.get('orchestr8r:date'));
    const store = writable(initialValue);
    const set = (date: NuDate) => {
        db.local.set('orchestr8r:date', `${date.toFormattedString('Py-m-d')}:`);
        store.set(date);
    };
    const changeDate = (deltaDays: number) => {
        store.update((date: NuDate) => {
            date.setDate(date.getDate() + deltaDays);
            db.local.set('orchestr8r:date', `${date.toFormattedString('Py-m-d')}:`);
            return date;
        });
    };
    return {
        ...store,
        set,
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



export const route = createRouteStore();
export const recentlyPlayed = writable({});
export const currentDate = createDateStore();
export const albums = writable({});
export const datesToAlbumIDs = writable({});
export const spotifySearchResults = writable(null);
export const spotifySearchOptions = createSpotifySearchOptionsStore();