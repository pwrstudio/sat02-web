import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const venues = await loadData("*[_type == 'venue']", {})
    return {
        venues
    };
}