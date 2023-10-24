import { loadData } from "$lib/modules/sanity.js"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const page = await loadData("*[_type == 'venue' && slug.current == $slug][0]", { slug: params.slug })
    const posts = await loadData("*[_type == 'project' && references($id)] {..., participants[]->{...}}", { id: page._id })
    return { page, posts };
}