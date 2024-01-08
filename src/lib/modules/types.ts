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

type ContentEditor = {
    _type: 'contentEditor';
    content: Block[];
};

type Block = {
    _key: string;
    _type: 'block';
    children: Span[];
    markDefs: MarkDef[];
    style: string;
};

type Span = {
    _type: 'span';
    marks: string[];
    text: string;
    _key: string;
};

type MarkDef = {
    _key: string;
    _type: 'link';
    href: string;
};

type Image = {
    _type: 'image';
    _key: string;
    asset: Reference;
};

type Reference = {
    _ref: string;
    _type: 'reference';
};

type Slug = {
    current: string;
    _type: 'slug';
};

type GeoPoint = {
    lng: number;
    lat: number;
    alt: number;
    _type: 'geopoint';
};

export type Post = {
    _id: string;
    _createdAt: string;
    _type: string;
    _rev: string;
    _updatedAt: string;
    slug: Slug;
    title: string;
    title_ar: string;
    processMedia: Image[];
    media: Image[];
    exhibitionStrand: "renewed-contextual" | "extraction-politics" | "intangible-bodies";
    venues: Post[];
    pullQuote_ar: string;
    participants: Post[];
    location: GeoPoint;
    pullQuote: string;
    description: ContentEditor;
    description_ar: ContentEditor;
    credits_ar: ContentEditor;
    credits: ContentEditor;
    content_ar: ContentEditor;
    content: ContentEditor;
    featuredImage: Image;
    images: Image[];
    address: string;
    openingHours: string;
};

export type Posts = {
    "all": Post[],
    "project": Post[];
    "participant": Post[];
    "event": Post[];
    "fieldNote": Post[]
}