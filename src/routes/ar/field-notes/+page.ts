import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const fieldNotes = await loadData("*[_type == 'field-note'] {..., participants[]->{...}, venues[]->{...}}", {})
    return {
        fieldNotes
    };
}