import { loadData } from "$lib/modules/sanity.js"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const page = await loadData("*[_id == 'team'][0]", {})
    return { page };
}