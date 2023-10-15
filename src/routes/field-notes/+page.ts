import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const fieldNotes = await loadData("*[_type == 'fieldNote'] {..., participants[]->{...}, venues[]->{...}}", {})
    const page = await loadData("*[_type == 'page' && _id == 'field-notes'][0] {..., participants[]->{...}, venues[]->{...}}", {})
    return {
        fieldNotes,
        page
    };
}