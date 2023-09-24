import { writable, derived, type Readable } from "svelte/store";
import { LANGUAGE } from "$lib/modules/types";

export const menuActive = writable(false);

// LANGUAGE
export const languageStore = writable(LANGUAGE.ENGLISH as LANGUAGE);
export const urlPrefix: Readable<string> = derived([languageStore], ([$languageStore]) => {
    return $languageStore === LANGUAGE.ENGLISH ? "/" : "/ar/"
})