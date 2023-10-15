import { loadData } from "$lib/modules/sanity.js"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const page = await loadData("*[_type == 'fieldNote' && slug.current == $slug][0] {..., participants[]->{...}, venues[]->{...}}", { slug: params.slug })
    return { page };
}