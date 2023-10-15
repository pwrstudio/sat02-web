import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const events = await loadData("*[_type == 'event'] {..., participants[]->{...}, venues[]->{...}}", {})
    const page = await loadData("*[_type == 'page' && _id == 'calendar'][0]", {})
    return {
        events,
        page
    };
}