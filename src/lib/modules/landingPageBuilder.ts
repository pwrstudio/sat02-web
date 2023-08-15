import { pickRandom } from "$lib/modules/utils"
import { standard, extended } from "$lib/modules/layouts"
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
    let frontpage: any[] = extended;

    for (let root of frontpage) {
        addPostToNode(root, posts);
    }

    return frontpage;
}