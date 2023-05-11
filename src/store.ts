import { writable } from 'svelte/store';
export const store = writable({});
export const buildProgress = writable({});
export const buildDone = writable(false);
