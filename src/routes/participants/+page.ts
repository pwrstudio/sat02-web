import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const participants = await loadData("*[_type == 'participant']", {})
    const page = await loadData("*[_type == 'page' && _id == 'participants-page'][0]", {})
    return {
        participants,
        page
    };
}