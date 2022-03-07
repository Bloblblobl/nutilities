import type { DataSnapshot } from 'firebase/database';
import { writable } from 'svelte/store';
import { db } from './clients/db';
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

export const route = writable('/');
export const recentlyPlayed = writable({});
export const currentDate = createDateStore(new NuDate());
export const albums = writable({});
export const datesToAlbumIDs = writable({});

const setupDateToAlbumIDs = () => {
    db.realtime.on('test/spotify/thisweek', (snapshot: DataSnapshot) => {
        const dates = snapshot.val();
        for (const [date, albumID] of Object.entries(dates)) {
            datesToAlbumIDs.update(dateToAlbumIDMap => ({...dateToAlbumIDMap, [date]: albumID}));
        }
    });
};

setupDateToAlbumIDs();