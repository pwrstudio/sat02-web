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