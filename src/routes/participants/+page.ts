import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const participants = await loadData("*[_type == 'participant']", {})
    return {
        participants
    };
}