import { pickRandom } from "$lib/modules/utils"
import type { Node, Posts } from "$lib/modules/types"
import { LAYOUT } from "$lib/modules/types";
import { createClient } from '@sanity/client';
import { SANITY_TOKEN } from '$env/static/private';
import { PUBLIC_SANITY_ID } from '$env/static/public';

const PERIOD = 1800000; // 30 minutes

const client = createClient({
    projectId: PUBLIC_SANITY_ID,
    dataset: "production",
    token: SANITY_TOKEN,
    apiVersion: '2022-12-12', // use a UTC date string
    useCdn: false,
});

async function writeToSanity(landingPage: any, ids: string[]) {
    console.log('write to sanity');
    console.log(landingPage);
    console.log(ids);

    // Get the current timestamp
    const timestamp = new Date().getTime();

    try {
        // Perform the patch using the Sanity client
        const result = await client
            .patch(landingPage._id) // Specify the document ID to patch
            .set({
                randomSelection: ids,
                timestamp: timestamp
            })
            .commit(); // Commit the patch to make it effective

        console.log('Sanity patch result:', result);
    } catch (error) {
        console.error('Error updating Sanity with patch:', error);
    }
}

function getRandomPost(node: Node, postsInCategory: any[], pickedPosts: string[]) {
    for (let i = 0; i < postsInCategory.length; i++) {
        let post = pickRandom(postsInCategory, 1)[0]
        // Was the post already picked?
        if (pickedPosts.includes(post._id)) continue;
        // If quote, must have pull quote 
        if (node.layout == LAYOUT.QUOTE && !post.pullQuote) continue
        // If image, must have image
        if (node.layout == LAYOUT.IMAGE && !(post.featuredImage && post.featuredImage.asset)) continue
        // Mark as picked
        pickedPosts.push(post._id)
        return [post, pickedPosts]
    }
    // Return the first post if for some reason we run out
    return [postsInCategory[0], pickedPosts]
}

function addPostToNode(node: Node, posts: Posts, pickedPosts: string[]) {

    if (node.type === "any") {
        [node.post, pickedPosts] = getRandomPost(node, posts.all, pickedPosts);
    } else if (['event', 'project', 'participant', 'fieldNote'].includes(node.type)) {
        [node.post, pickedPosts] = getRandomPost(node, posts[node.type], pickedPosts);
    }

    // Recursively handle children
    if (node.children) {
        for (let child of node.children) {
            addPostToNode(child, posts, pickedPosts);
        }
    }

    return pickedPosts;
}

function addFromServer(node: Node, posts: Posts, randomSelection: string[]) {
    if (randomSelection.length === 0) return;

    if (['event', 'project', 'participant', 'fieldNote', 'any'].includes(node.type)) {
        let id = randomSelection.shift();
        node.post = posts.all.find(post => post._id === id);
    }

    // Recursively handle children
    if (node.children) {
        for (let child of node.children) {
            addFromServer(child, posts, randomSelection,);
        }
    }
}

function addTopPost(node: Node, topPost: any) {

    if (['event', 'project', 'participant'].includes(node.type)) {
        node.post = topPost;
    }

    // Recursively handle children
    if (node.children) {
        for (let child of node.children) {
            addTopPost(child, topPost);
        }
    }
}

export async function buildFrontPage(layout: any[], landingPage: any, posts: Posts) {

    let frontpage: any[] = layout;

    const currentTimestamp = new Date().getTime();

    console.log(landingPage.timestamp)
    console.log(currentTimestamp)
    console.log('ms passed', currentTimestamp - (landingPage.timestamp || 0))
    console.log('period', PERIOD)
    console.log('has period passed?', currentTimestamp - (landingPage.timestamp || 0) > PERIOD)

    if (currentTimestamp - (landingPage.timestamp || 0) > PERIOD) {
        // More than 30 minutes has passed, make new selection
        console.log('new selection')
        let pickedPosts: string[] = [];
        let ids: string[] = [];
        for (let index = 0; index < frontpage.length; index++) {
            ids = addPostToNode(frontpage[index], posts, pickedPosts);
        }
        console.log('ids', ids)
        // Write to server
        await writeToSanity(landingPage, ids)
    } else {
        // Less than 30 minutes has passed, load from server
        console.log('from server')
        for (let index = 0; index < frontpage.length; index++) {
            addFromServer(frontpage[index], posts, landingPage.randomSelection);
        }
    }

    console.log('frontpage', frontpage)

    return frontpage;
}

export async function buildTopSection(layout: any[], landingPage: any, posts: any[]) {
    let topSection: Node[] = layout;

    if (!landingPage.topPost) {
        const randomPost = pickRandom(posts, 1)[0]
        addTopPost(topSection[0], randomPost);
    } else {
        addTopPost(topSection[0], landingPage.topPost[0]);
    }

    return topSection;
}