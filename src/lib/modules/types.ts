// ENUMS

export enum LANGUAGE {
    ENGLISH,
    ARABIC
}

export enum POST_TYPE {
    PROJECT,
    PARTICIPANT,
    EVENT,
    FIELD_NOTE,
    ANY
}

export enum COLOR {
    ORANGE = "#ff6c2f",
    BLUE = "#009eb4",
    PURPLE = "#EA5FAE",
    GREEN = "#7d7547",
    GREY = "#d3d3d3",
    WHITE = "#ffffff",
    BLACK = "#1e1e1e"
}

export enum DECO_TYPE {
    NONE,
    CIRCLE_ONE,
    CIRCLE_TWO,
    LINE_ONE,
    LINE_TWO
}

export enum LAYOUT {
    IMAGE,
    QUOTE,
    FULL
}

export enum ALIGNMENT {
    LEFT,
    RIGHT
}

// TYPES

export type FrontpagePost = {
    post: any,
    category: string,
    bgColor: string,
    width: string
}

export type NodeType = "section" | "column" | "squareDeco" | "participant" | "event" | "geo" | "project" | "fullWidthDeco" | "dates" | "dotLine" | "map" | "any" | "fieldNote";

export type BorderOption = {
    top?: boolean,
    bottom?: boolean,
    left?: boolean,
    right?: boolean
}

export type Node = {
    type: NodeType;
    layout?: LAYOUT;
    alignment?: ALIGNMENT;
    children?: Node[];
    post?: any;
    decoColor?: COLOR;
    decoType?: DECO_TYPE;
    bgColor?: COLOR;
    border?: BorderOption;
    spaced?: boolean;
};

export type CircleGroup = {
    circleCount: number;
    dotRadius: number;
    baseDistance: number;
    verticalShiftRange: number;
    horizontalShiftRange: number;
};

export type Posts = {
    "all": any[],
    "project": any[];
    "participant": any[];
    "event": any[];
    "fieldNote": any[]
}