import { shuffle, pickRandom } from "$lib/modules/utils"
import { COLORS } from "$lib/modules/constants"
import type { FrontpagePost } from "$lib/modules/types"


export function buildFrontPage(projects: any[], participants: any[], events: any[]) {
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

    return frontpage;
}