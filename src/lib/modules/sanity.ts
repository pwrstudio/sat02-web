// * * * * * * * * * * * * * * * * * * * * * * * * * * * 
//
//  sanity.js =>
//  functions to work with the Sanity database
//
// * * * * * * * * * * * * * * * * * * * * * * * * * * *

import { createClient } from "@sanity/client"
import blocksToHtml from "@sanity/block-content-to-html"
import imageUrlBuilder from "@sanity/image-url"
import get from "lodash/get.js"
import { PUBLIC_SANITY_ID } from '$env/static/public';

export const client = createClient({
    projectId: PUBLIC_SANITY_ID,
    dataset: "production",
    apiVersion: '2022-12-12', // use a UTC date string
    useCdn: false,
})

const h = blocksToHtml.h

function transformFileString(fileString: string): string {
    // Remove the "file-" prefix
    let trimmedString = fileString.replace('file-', '');

    // Replace the last hyphen with a dot
    let lastIndex = trimmedString.lastIndexOf('-');
    if (lastIndex !== -1) {
        trimmedString = trimmedString.substring(0, lastIndex) + '.' + trimmedString.substring(lastIndex + 1);
    }

    return trimmedString;
}

export const renderBlockText = text =>
    blocksToHtml({
        blocks: text,
        serializers: serializers,
        projectId: PUBLIC_SANITY_ID,
        dataset: "production",
    })

export const toPlainText = (blocks = []) => {
    return blocks
        .map(block => {
            if (block._type !== "block" || !block.children) {
                return ""
            }
            return block.children.map(child => child.text).join("")
        })
        .join("\n\n")
}

function getPlatformIcon(platform: string): string | null {
    if (!platform) return null
    switch (platform) {
        case "twitter":
            return h("i", { className: 'fab fa-twitter' }, "");
        case "instagram":
            return h("i", { className: 'fab fa-instagram' }, "");
        case "facebook":
            return h("i", { className: 'fab fa-facebook' }, "");
        default:
            return null
    }
}

const serializers = {
    marks: {
        link: props => {
            const external = get(props, 'mark.href', '').includes('http')
            let linkOptions = external ? { target: "_blank", rel: "noreferrer", href: props.mark.href } : { href: props.mark.href }
            return h(
                "span",
                {},
                [
                    getPlatformIcon(get(props, 'mark.platform', '')),
                    h(
                        "a",
                        linkOptions,
                        props.children
                    )
                ]
            )
        },
        pdf: props => {
            // Accessing the full URL directly from the mark
            const BASE_URL = "https://cdn.sanity.io/files/q6keo3xr/production/"
            const fileUrl = BASE_URL + transformFileString(get(props, 'mark.file.asset._ref', ''))
            return h(
                "a",
                { href: fileUrl, target: "_blank", rel: "noopener noreferrer" },
                props.children
            );
        },
    },
    types: {
        block: props => {
            const style = props.node.style || "normal"
            if (style === "blockquote") return h("blockquote", {}, props.children)
            if (style === "h2") return h("h2", {}, props.children)
            if (style === "h3") return h("h3", {}, props.children)
            return h("p", { className: style }, props.children)
        }
    },
}

export const loadData = async (query, params) => {
    try {
        const res = await client.fetch(query, params)
        if (res === null) {
            return Promise.reject(new Error(404))
        }
        return res
    } catch (err) {
        return Promise.reject(new Error(404))
    }
}

const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)