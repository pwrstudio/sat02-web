// ENUMS

export enum LANGUAGE {
    ENGLISH,
    ARABIC
}

export enum POST_TYPE {
    PROJECT,
    PARTICIPANT,
    EVENT
}

export enum COLOR {
    ORANGE = "#ff6c2f",
    BLUE = "#009eb4",
    PURPLE = "#910d6a",
    GREEN = "#7d7547",
    WHITE = "#ffffff",
    BLACK = "#1e1e1e"
}

// TYPES

export type FrontpagePost = {
    post: any,
    category: string,
    bgColor: string,
    width: string
}

export type NodeType = "section" | "column" | "squareDeco" | "subtitle" | "participant" | "event" | "geo" | "project" | "fullWidthDeco" | "dates" | "squareAnimation" | "dotLine" | "map";

export type Node = {
    type: NodeType;
    layout?: "image" | "quote";
    children?: Node[];
    post?: any;
    decoColor?: COLOR;
    bgColor?: COLOR;
};