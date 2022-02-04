import type { DataSnapshot } from 'firebase/database';
import { writable, derived } from 'svelte/store';
import { db } from './clients/db';
import { getDatesThisWeek } from './clients/temporal';


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

const setupAadAlbums = () => {
    db.realtime.on('test/spotify/thisweek', (snapshot: DataSnapshot) => {
        const dates = snapshot.val();
        console.log(dates);
        Object.entries(dates).forEach(([date, albumID]) => aadAlbums.set(date, albumID));
    });
};

export const aadDate = writable(new Date());
export const aadAlbums = createMapStore({});

setupAadAlbums();