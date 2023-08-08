import { writable } from "svelte/store";
import { LANGUAGE } from "$lib/modules/types";

export const menuActive = writable(false);
export let language = writable(LANGUAGE.ENGLISH as LANGUAGE);