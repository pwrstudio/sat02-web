import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const posts = await loadData("*[_type == 'venue'] | order(displayOrder)", {})
    const page = await loadData("*[_type == 'page' && _id == 'venues'][0]", {})
    return {
        posts,
        page
    };
}