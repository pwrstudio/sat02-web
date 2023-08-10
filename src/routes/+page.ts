import { loadData } from "$lib/modules/sanity"
import { shuffle, pickRandom } from "$lib/modules/utils"
import { COLORS } from "$lib/modules/constants"
import type { FrontpagePost } from "$lib/modules/types"
// import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
    const projects = await loadData("*[_type == 'project'] {..., participants[]->{...}, venues[]->{...}}", {})
    const participants = await loadData("*[_type == 'participant'] | order(dateTime asc)", {})
    const events = await loadData("*[_type == 'event'] | order(dateTime asc)", {})

    let frontpage: FrontpagePost[] = [];
    const selectedPosts = shuffle([...pickRandom(projects, 3), ...pickRandom(participants, 3), ...pickRandom(events, 3)]);

    for (let i = 0; i < selectedPosts.length; i++) {
        let post: FrontpagePost = {
            post: selectedPosts[i],
            category: selectedPosts[i]._type,
            bgColor: pickRandom(COLORS, 1)[0],
            width: "half"
        }
        frontpage.push(post);
    }

    return {
        frontpage
    };
}