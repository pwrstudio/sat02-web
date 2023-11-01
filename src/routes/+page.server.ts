import { buildFrontPage, buildTopSection } from "$lib/modules/landingPageBuilder.server"
import { loadData } from "$lib/modules/sanity"
import { final, top } from "$lib/modules/layouts"

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    const landingPage = await loadData("*[_type == 'landingPage'][0] {..., topPost[]->{...}}", {})
    const projects = await loadData("*[_type == 'project'] {..., participants[]->{...}, venues[]->{...}}", {})
    const participants = await loadData("*[_type == 'participant']", {})
    const events = await loadData("*[_type == 'event'] {..., participants[]->{...}, venues[]->{...}} | order(dateTime asc)", {})
    const venues = await loadData("*[_type == 'venue']", {})

    const frontpage = await buildFrontPage(final, landingPage, { "project": projects, "participant": participants, "event": events });
    const topSection = buildTopSection(top, landingPage);

    return {
        frontpage,
        topSection,
        venues
    };
}