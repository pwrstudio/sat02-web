import type { Node } from "$lib/modules/types";

export const extended: Node[] = [
    {
        type: "section",
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "squareDeco"
                    },
                    {
                        type: "subtitle"
                    },
                    {
                        type: "participant",
                        bgColor: "blue",
                        layout: "quote"
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "event",
                        bgColor: "green",
                        layout: "image"
                    },
                    {
                        type: "geo",
                    },
                    {
                        type: "project",
                        bgColor: "white",
                        layout: "quote"
                    },
                ]
            }
        ]
    },
    {
        type: "section",
        children: [
            {
                type: "fullWidthDeco"
            },
            {
                type: "dates",
            }
        ]
    },
    {
        type: "section",
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "squareAnimation"
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "project",
                        bgColor: "white",
                        layout: "image"
                    },
                ]
            }
        ]
    },
    {
        type: "section",
        children: [
            {
                type: "dates",
            }
        ]
    },
    {
        type: "section",
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "project",
                        bgColor: "green",
                        layout: "image"

                    },
                    {
                        type: "participant",
                        bgColor: "blue",
                        layout: "quote"
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "map",
                    },
                    {
                        type: "project",
                        bgColor: "white",
                        layout: "image"
                    },
                ]
            }
        ]
    },
];

export const standard: Node[] = [
    {
        type: "section",
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "squareDeco"
                    },
                    {
                        type: "subtitle"
                    },
                    {
                        type: "participant",
                        bgColor: "blue",
                        layout: "quote"
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "event",
                        bgColor: "green",
                        layout: "image"
                    },
                    {
                        type: "geo",
                    },
                    {
                        type: "project",
                        bgColor: "white",
                        layout: "quote"
                    },
                ]
            }
        ]
    },
    {
        type: "section",
        children: [
            {
                type: "fullWidthDeco"
            },
            {
                type: "dates",
            }
        ]
    },
    {
        type: "section",
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "project",
                        bgColor: "green",
                        layout: "image"

                    },
                    {
                        type: "participant",
                        bgColor: "blue",
                        layout: "quote"
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "map",
                    },
                    {
                        type: "project",
                        bgColor: "white",
                        layout: "image"
                    },
                ]
            }
        ]
    },
];