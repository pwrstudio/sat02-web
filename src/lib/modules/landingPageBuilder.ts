import { pickRandom } from "$lib/modules/utils"
import { demo } from "$lib/modules/layouts"
import type { Node } from "$lib/modules/types"

type Posts = {
    "project": any[];
    "participant": any[];
    "event": any[];
}

function getPostBySlug(posts: Posts, type: keyof Posts, slug: string) {
    return posts[type].find((post: any) => post.slug?.current === slug);
}

function addPostToNode(node: Node, posts: Posts) {

    let selectedProjectSlugs = [
        "return-to-sender",
        "africa-a-designers-utopia-lagos-chapter",
        "anthropocene-museum-9-0-sharjah-s-old-slaughterhouse-tour",
        "time-transitions",
        "la-balsanera-productive-floating-house",
        "power-shifts",
        "mud-walks-provisional-title",
        "jabala-9-ash-cleansing-temple"
    ];

    let selectedParticipantSlugs = [
        "thomas-egoumenides",
        "nifemi-marcus-bello",
        "papa-omotayo-and-eve-nnaji-moeaaadd-apt",
        "yussef-agbo-ola-olaniyi-studio",
        "thao-nguyen-phan",
        "ruina-architecture-julia-peres-and-victoria-braga"
    ]

    if (node.type === "event") {
        node.post = pickRandom(posts["event"], 1)[0];
    }

    if (node.type === "participant") {
        node.post = getPostBySlug(posts, "participant", selectedParticipantSlugs.shift() || "");
    }

    if (node.type === "project") {
        node.post = getPostBySlug(posts, "project", selectedProjectSlugs.shift() || "");
    }


    if (node.children) {
        for (let child of node.children) {
            addPostToNode(child, posts);
        }
    }
}

export function buildFrontPage(posts: Posts) {
    let frontpage: any[] = demo;

    for (let root of frontpage) {
        addPostToNode(root, posts);
    }

    return frontpage;
}