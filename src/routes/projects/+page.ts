import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const projects = await loadData("*[_type == 'project'] {..., participants[]->{...}, venues[]->{...}}", {})
    const page = await loadData("*[_type == 'page' && _id == 'projects-page'][0]", {})
    return {
        projects,
        page
    };
}