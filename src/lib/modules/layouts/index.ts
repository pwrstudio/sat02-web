import type { Node } from "$lib/modules/types";

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
                        bgColor: "blue"
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "event",
                        bgColor: "green"
                    },
                    {
                        type: "geo",
                    },
                    {
                        type: "project",
                        bgColor: "white"
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
                    },
                    {
                        type: "participant",
                        bgColor: "blue"
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
                        bgColor: "white"
                    },
                ]
            }
        ]
    },
];