import type { DataSnapshot } from 'firebase/database';
import { writable, derived } from 'svelte/store';
import { db } from './clients/db';
import { getDatesThisWeek } from './clients/temporal';

const setupAadAlbums = () => {
    db.realtime.on('test/spotify/thisweek', (snapshot: DataSnapshot) => {
        const dates = snapshot.val();
        Object.entries(dates).forEach(([date, albumID]) => aadAlbums.set(date, albumID));
    });
};

// inspired by https://svelte.dev/repl/ccbc94cb1b4c493a9cf8f117badaeb31?version=3.16.7
function createMapStore(initialValue) {
    const store = writable(initialValue);
    const set = (key, value) => store.update(m => Object.assign({}, m, {[key]: value}));
    const derivedStore = derived([store, aadDate], ([s, d]) => {
        const datesThisWeek = getDatesThisWeek(d).map(date => date.sortFormat);
        const current = datesThisWeek.reduce((result, date) => {
            result[date] = s[date];
            return result;
        }, {});
        return {
            keys: Object.keys(s),
            values: Object.values(s),
            entries: Object.entries(s),
            current,
            set: (key, value) => {
                store.update(m => Object.assign({}, m, {[key]: value}));
            },
            delete: (key) => {
                store.update(m => {
                    delete m[key];
                    return m;
                });
            },
        }
    });

    return {
        set,
        subscribe: derivedStore.subscribe,
    }
}

export const route = writable('/');
export const recentlyPlayed = writable({});

const createDateStore = (initialValue) => {
    const store = writable(initialValue);
    const changeDate = (deltaDays) => store.update(d => {
       d.setDate(d.getDate() + deltaDays);
       return d;     
    });
    return {
        ...store,
        changeDate,
        previousWeek: () => changeDate(-7),
        nextWeek: () => changeDate(7),
    }
}

export const aadDate = createDateStore(new Date());
export const aadAlbums = createMapStore({});

setupAadAlbums();