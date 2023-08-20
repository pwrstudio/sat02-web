import { pickRandom } from "$lib/modules/utils"
import type { Node } from "$lib/modules/types"

type Posts = {
    "project": any[];
    "participant": any[];
    "event": any[];
}

type Indices = {
    "project": number;
    "participant": number;
    "event": number;
}

// function getPostBySlug(posts: Posts, type: keyof Posts, slug: string) {
//     return posts[type].find((post: any) => post.slug?.current === slug);
// }

function addPostToNode(node: Node, posts: Posts, indices: Indices) {

    if (node.type === "event") {
        node.post = posts.event[indices.event++ % posts.event.length]
    }

    if (node.type === "participant") {
        node.post = posts.participant[indices.participant++ % posts.participant.length]
    }

    if (node.type === "project") {
        node.post = posts.project[indices.project++ % posts.project.length]
    }

    if (node.children) {
        for (let child of node.children) {
            addPostToNode(child, posts, indices);
        }
    }
}

export function buildFrontPage(layout: any[], posts: Posts) {
    let frontpage: any[] = layout;

    let indicides: Indices = {
        "project": 0,
        "participant": 0,
        "event": 0
    }

    for (let root of frontpage) {
        addPostToNode(root, posts, indicides);
    }

    return frontpage;
}