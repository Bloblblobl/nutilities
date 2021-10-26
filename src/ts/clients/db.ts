import { app } from './firebase';
import { Database, getDatabase, set, ref } from 'firebase/database';

export const db: Database = getDatabase(app);

// export const db = {
//     write: (path: string, value: any) => {
//         set(ref(database, path), value);
//     },
//     read: async (path: string) => {
        
//     },
// };