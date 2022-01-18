import { writable } from 'svelte/store';

export const route = writable('/');
export const recentlyPlayed = writable({});
export const spotifySearchResults = writable({});