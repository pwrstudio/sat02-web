import { buildFrontPage } from "$lib/modules/landingPageBuilder"
import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load() {
    const projects = await loadData("*[_type == 'project'] {..., participants[]->{...}, venues[]->{...}}", {})
    const participants = await loadData("*[_type == 'participant'] | order(dateTime asc)", {})
    const events = await loadData("*[_type == 'event'] | order(dateTime asc)", {})

    const frontpage = buildFrontPage({ "project": projects, "participant": participants, "event": events });

    return {
        frontpage
    };
}