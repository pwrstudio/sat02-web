import { buildFrontPage, buildTopSection } from "$lib/modules/landingPageBuilder.server"
import { loadData } from "$lib/modules/sanity"
import { final, top } from "$lib/modules/layouts"

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
    const landingPage = await loadData("*[_type == 'landingPage'][0] {..., topPost[]->{..., venues[]->{...}, participants[]->{...}}}", {})
    const project = await loadData("*[_type == 'project'] {..., participants[]->{...}, venues[]->{...}}", {})
    const participant = await loadData("*[_type == 'participant']", {})
    const fieldNote = await loadData("*[_type == 'fieldNote'] {..., participants[]->{...}}", {})
    const event = await loadData("*[_type == 'event'] {..., participants[]->{...}, venues[]->{...}} | order(dateTime asc)", {})
    const venues = await loadData("*[_type == 'venue'] | order(displayOrder)", {})

    const all = [...participant, ...project, ...event, ...fieldNote]
    const posts = { all, participant, project, event, fieldNote }
    const topPosts = project

    const frontpage = await buildFrontPage(final, landingPage, posts);
    const topSection = buildTopSection(top, landingPage, topPosts);

    return {
        frontpage,
        topSection,
        venues
    };
}