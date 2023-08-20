import { buildFrontPage } from "$lib/modules/landingPageBuilder"
import { loadData } from "$lib/modules/sanity"

/** @type {import('./$types').PageLoad} */
export async function load() {
    let projects = await loadData("*[_type == 'project'] {..., participants[]->{...}, venues[]->{...}}", {})
    let participants = await loadData("*[_type == 'participant']", {})
    const events = await loadData("*[_type == 'event'] {..., participants[]->{...}, venues[]->{...}} | order(dateTime asc)", {})
    const venues = await loadData("*[_type == 'venue']", {})

    const selectedProjectSlugs = [
        "return-to-sender",
        "africa-a-designers-utopia-lagos-chapter",
        "anthropocene-museum-9-0-sharjah-s-old-slaughterhouse-tour",
        "time-transitions",
        "la-balsanera-productive-floating-house",
        "power-shifts",
        "jabala-9-ash-cleansing-temple"
    ];

    const selectedParticipantSlugs = [
        "thomas-egoumenides",
        "nifemi-marcus-bello",
        "papa-omotayo-and-eve-nnaji-moeaaadd-apt",
        "yussef-agbo-ola-olaniyi-studio",
        "thao-nguyen-phan",
        "ruina-architecture-julia-peres-and-victoria-braga"
    ]

    projects = projects.filter((project: any) => selectedProjectSlugs.includes(project.slug?.current));
    participants = participants.filter((participant: any) => selectedParticipantSlugs.includes(participant.slug?.current));

    const frontpage = buildFrontPage({ "project": projects, "participant": participants, "event": events });

    return {
        frontpage,
        venues
    };
}