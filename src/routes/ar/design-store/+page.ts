import { loadData } from "$lib/modules/sanity.js"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const page = await loadData("*[_id == 'design-store'][0]", {})
    const storeItems = await loadData("*[_type == 'storeItem']", {})
    return { page, storeItems };
}