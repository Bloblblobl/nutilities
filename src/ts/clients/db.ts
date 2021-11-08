import { app } from './firebase';
import { Database, getDatabase, set, ref } from 'firebase/database';

const local: Storage = window.localStorage;
const realtime: Database = getDatabase(app);

export const db = {
    local,
    realtime,
}

// export const db = {
//     write: (path: string, value: any) => {
//         set(ref(database, path), value);
//     },
//     read: async (path: string) => {
        
//     },
// };