import { app } from './firebase';
import { Database, getDatabase, get, set, ref } from 'firebase/database';

const _local: Storage = window.localStorage;
const _realtime: Database = getDatabase(app);

const local = {
    get: (key: string) => _local.getItem(key),
    set: (key: string, value: any) => {
        if (value === null) {
            return;
        }
        try {
            _local.setItem(key, value);
        } catch (e) {
            console.error(e);
        }
    },
    delete: (key: string) => _local.removeItem(key),
    getKeys: () => Object.keys(_local),
}
const realtime = {
    get: async (key: string) => {
        const dbRef = ref(_realtime, key);
        let snapshot = await get(dbRef);
        if (!snapshot.exists()) {
            return null;
        }
        return snapshot.val();
    },
    set: (key: string, value: any) => {
        const dbRef = ref(_realtime, key);
        set(dbRef, value);
    },
}

export const db = {
    local,
    realtime,
}