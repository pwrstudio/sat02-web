import { loadData } from "$lib/modules/sanity"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    const projects = await loadData("*[_type == 'project']", {})
    const participants = await loadData("*[_type == 'participant'] | order(dateTime asc)", {})
    const events = await loadData("*[_type == 'event'] | order(dateTime asc)", {})

    return {
        projects,
        participants,
        events
    };
}