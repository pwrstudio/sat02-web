export enum LANGUAGE {
    ENGLISH,
    ARABIC
}

export enum POST_TYPE {
    PROJECT,
    PARTICIPANT,
    EVENT
}

export type FrontpagePost = {
    post: any,
    category: string,
    bgColor: string,
    width: string
}

export type Node = {
    type: "section" | "column" | "squareDeco" | "subtitle" | "participant" | "event" | "geo" | "project" | "fullWidthDeco" | "dates" | "squareAnimation";
    layout?: "image" | "quote";
    children?: Node[];
    post?: any;
    bgColor?: "white" | "blue" | "green" | "orange" | "purple";
};