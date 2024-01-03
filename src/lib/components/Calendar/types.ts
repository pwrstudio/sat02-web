export interface Event {
    dateTime: string
    period: "openingEvent" | "closingEvent"
}

export type EventGroupedByDate = {
    date: string
    events: Event[]
}

export type EventsByPeriod = {
    openingEvents: EventGroupedByDate[]
    closingEvents: EventGroupedByDate[]
}