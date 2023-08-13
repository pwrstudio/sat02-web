import { shuffle, pickRandom } from "$lib/modules/utils"
import { COLORS } from "$lib/modules/constants"
import type { FrontpagePost } from "$lib/modules/types"
import { standard } from "$lib/modules/layouts"
import type { Node } from "$lib/modules/types"

type Posts = {
    "project": any[],
    "participant": any[],
    "event": any[]
}

function addPostToNode(node: Node, posts: Posts) {

    if (['project', 'participant', 'event'].includes(node.type)) {
        node.post = pickRandom(posts[node.type], 1)[0];
    }
    if (node.children) {
        for (let child of node.children) {
            addPostToNode(child, posts);
        }
    }
}

export function buildFrontPage(posts: Posts) {
    let frontpage: any[] = standard;

    for (let root of frontpage) {
        addPostToNode(root, posts);
    }

    return frontpage;
}


    // const selectedPosts = shuffle([...pickRandom(projects, 3), ...pickRandom(participants, 3), ...pickRandom(events, 3)]);

    // for (let i = 0; i < selectedPosts.length; i++) {
    //     let post: FrontpagePost = {
    //         post: selectedPosts[i],
    //         category: selectedPosts[i]._type,
    //         bgColor: pickRandom(COLORS, 1)[0],
    //         width: "half"
    //     }
    //     frontpage.push(post);
    // }