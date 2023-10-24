import type { Node } from "$lib/modules/types";
import { COLOR, DECO_TYPE, LAYOUT, ALIGNMENT } from "$lib/modules/types";

export const demo: Node[] = [
    {
        type: "section",
        decoColor: COLOR.ORANGE,
        decoType: DECO_TYPE.CIRCLE_ONE,
        children: [
            {
                type: "event",
                bgColor: COLOR.GREEN,
                layout: LAYOUT.FULL,
                alignment: ALIGNMENT.LEFT
            },
            {
                type: "dates",
                // bgColor: COLOR.GREEN,
                bgColor: COLOR.ORANGE
            }
        ]
    },
    {
        type: "section",
        decoColor: COLOR.BLUE,
        decoType: DECO_TYPE.CIRCLE_TWO,
        spaced: true,
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "project",
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.IMAGE,
                    },
                    {
                        type: "participant",
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.IMAGE,
                        border: {
                            top: true,
                        }
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "participant",
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.QUOTE,
                        border: {
                            left: true,
                        }
                    },
                    {
                        type: "geo",
                    },
                    {
                        type: "project",
                        // bgColor: COLOR.WHITE,
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.QUOTE,
                        border: {
                            left: true,
                        }
                    },

                ]
            },
            {
                type: "dates",
                // bgColor: COLOR.WHITE
                bgColor: COLOR.BLUE
            }
        ]
    },
    {
        type: "section",
        decoColor: COLOR.ORANGE,
        decoType: DECO_TYPE.LINE_ONE,
        spaced: true,
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "project",
                        // bgColor: COLOR.WHITE,
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.IMAGE,
                        border: {
                            bottom: true,
                        }
                    },

                ]
            },
            {
                type: "column",
                children: [

                    {
                        type: "participant",
                        // bgColor: COLOR.WHITE,
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.QUOTE,
                        border: {
                            left: true,
                            bottom: true
                        }
                    },
                ]
            },
            {
                type: "project",
                bgColor: COLOR.GREEN,
                layout: LAYOUT.FULL,
                alignment: ALIGNMENT.RIGHT,
            },
            {
                type: "dates",
                // bgColor: COLOR.WHITE
                bgColor: COLOR.ORANGE
            }
        ]
    },
    {
        type: "section",
        decoType: DECO_TYPE.NONE,
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "squareDeco",
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.IMAGE,
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "map",
                    }
                ]
            }
        ]
    }
];

export const demo2: Node[] = [
    {
        type: "section",
        decoColor: COLOR.BLUE,
        decoType: DECO_TYPE.CIRCLE_TWO,
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "squareDeco",
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.IMAGE,
                    },
                    {
                        type: "geo",
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "project",
                        bgColor: COLOR.WHITE,
                        layout: LAYOUT.IMAGE,
                    },
                    {
                        type: "subtitle",
                    },
                ]
            }
        ]
    },
    {
        type: "section",
        decoColor: COLOR.ORANGE,
        decoType: DECO_TYPE.CIRCLE_ONE,
        children: [
            {
                type: "event",
                bgColor: COLOR.GREEN,
                layout: LAYOUT.FULL,
                alignment: ALIGNMENT.LEFT
            },
            {
                type: "dates",
                bgColor: COLOR.GREEN
            }
        ]
    },
    {
        type: "section",
        decoColor: COLOR.PURPLE,
        decoType: DECO_TYPE.LINE_ONE,
        children: [

            {
                type: "column",
                children: [
                    {
                        type: "project",
                        bgColor: COLOR.WHITE,
                        layout: LAYOUT.IMAGE,
                    },

                ]
            },
            {
                type: "column",
                children: [

                    {
                        type: "participant",
                        bgColor: COLOR.WHITE,
                        layout: LAYOUT.QUOTE,
                    },
                ]
            },
        ]
    },
    {
        type: "section",
        decoColor: COLOR.ORANGE,
        decoType: DECO_TYPE.LINE_TWO,
        children: [
            {
                type: "project",
                bgColor: COLOR.GREEN,
                layout: LAYOUT.FULL,
                alignment: ALIGNMENT.RIGHT
            },
        ]
    },
    {
        type: "section",
        decoType: DECO_TYPE.NONE,
        children: [
            {
                type: "column",
                children: [
                    {
                        type: "squareDeco",
                        bgColor: COLOR.GREEN,
                        layout: LAYOUT.IMAGE,
                    },
                ]
            },
            {
                type: "column",
                children: [
                    {
                        type: "map",
                    }
                ]
            }
        ]
    }


];

// export const extended: Node[] = [
//     {
//         type: "section",
//         children: [
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "squareDeco"
//                     },
//                     {
//                         type: "subtitle"
//                     },
//                     {
//                         type: "participant",
//                         bgColor: "blue",
//                         layout: "image"
//                     },
//                 ]
//             },
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "event",
//                         bgColor: "green",
//                         layout: "image"
//                     },
//                     {
//                         type: "geo",
//                     },
//                     {
//                         type: "project",
//                         bgColor: "white",
//                         layout: "quote"
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "fullWidthDeco"
//             },
//             {
//                 type: "dates",
//             },
//             {
//                 type: "dotLine"
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "squareAnimation"
//                     },
//                 ]
//             },
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "project",
//                         bgColor: "white",
//                         layout: "image"
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "dates",
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "project",
//                         bgColor: "green",
//                         layout: "image"

//                     },
//                     {
//                         type: "participant",
//                         bgColor: "blue",
//                         layout: "quote"
//                     },
//                 ]
//             },
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "map",
//                     },
//                     {
//                         type: "project",
//                         bgColor: "white",
//                         layout: "image"
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "dotLine"
//             }
//         ]
//     },
// ];

// export const standard: Node[] = [
//     {
//         type: "section",
//         children: [
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "squareDeco"
//                     },
//                     {
//                         type: "subtitle"
//                     },
//                     {
//                         type: "participant",
//                         bgColor: "blue",
//                         layout: "quote"
//                     },
//                 ]
//             },
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "event",
//                         bgColor: "green",
//                         layout: "image"
//                     },
//                     {
//                         type: "geo",
//                     },
//                     {
//                         type: "project",
//                         bgColor: "white",
//                         layout: "quote"
//                     },
//                 ]
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "fullWidthDeco"
//             },
//             {
//                 type: "dates",
//             }
//         ]
//     },
//     {
//         type: "section",
//         children: [
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "project",
//                         bgColor: "green",
//                         layout: "image"

//                     },
//                     {
//                         type: "participant",
//                         bgColor: "blue",
//                         layout: "quote"
//                     },
//                 ]
//             },
//             {
//                 type: "column",
//                 children: [
//                     {
//                         type: "map",
//                     },
//                     {
//                         type: "project",
//                         bgColor: "white",
//                         layout: "image"
//                     },
//                 ]
//             }
//         ]
//     },
// ];