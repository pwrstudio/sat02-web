<script lang="ts">
  import { formatCalendarDateTime } from "$lib/modules/date"
  import { fade } from "svelte/transition"
  import ListingItem from "../Listing/ListingItem.svelte"
  import ListingHeader from "../Listing/ListingHeader.svelte"
  export let posts: any[] = []
  export let category: "participants" | "calendar" | "projects"

  let sortOrder = "title"
  let showImages = false

  interface Event {
    dateTime: string
    period: "openingEvent" | "closingEvent"
  }

  type EventGroupedByDate = {
    date: string
    events: Event[]
  }

  type EventsByPeriod = {
    openingEvents: EventGroupedByDate[]
    closingEvents: EventGroupedByDate[]
  }

  /**
   * Organizes and sorts events by date and period, excluding dates without events of a specific type.
   *
   * @param {Event[]} events - An array of Event objects to be organized.
   * @returns {EventsByPeriod} An object containing opening and closing events grouped by date.
   */
  function organizeAndSortEvents(events: Event[]): EventsByPeriod {
    // Create an object to store events grouped by date and period
    const eventsByDateAndPeriod: Record<string, Record<string, Event[]>> = {}

    // Group events by date and period
    for (const event of events) {
      const date = event.dateTime.split("T")[0]
      if (!eventsByDateAndPeriod[date]) {
        eventsByDateAndPeriod[date] = {
          openingEvent: [],
          closingEvent: [],
        }
      }
      eventsByDateAndPeriod[date][event.period].push(event)
    }

    // Sort events by date in ascending order
    const sortedDates = Object.keys(eventsByDateAndPeriod).sort()

    // Initialize the object to store the organized events
    const organizedEvents: EventsByPeriod = {
      openingEvents: [],
      closingEvents: [],
    }

    // Iterate through the dates and include them in the result in ascending order
    for (const date of sortedDates) {
      // Sort opening events by ascending time
      const openingEvents = eventsByDateAndPeriod[date].openingEvent.sort(
        (a, b) => a.dateTime.localeCompare(b.dateTime)
      )

      // Sort closing events by ascending time
      const closingEvents = eventsByDateAndPeriod[date].closingEvent.sort(
        (a, b) => a.dateTime.localeCompare(b.dateTime)
      )

      // Include the date and events if there are any opening events
      if (openingEvents.length > 0) {
        organizedEvents.openingEvents.push({
          date,
          events: openingEvents,
        })
      }

      // Include the date and events if there are any closing events
      if (closingEvents.length > 0) {
        organizedEvents.closingEvents.push({
          date,
          events: closingEvents,
        })
      }
    }

    return organizedEvents
  }

  const organizedEvents = organizeAndSortEvents(posts)
  console.log(organizedEvents)
</script>

<ListingHeader
  {category}
  {posts}
  on:sort={e => {
    sortOrder = e.detail
  }}
  on:images={e => {
    showImages = e.detail
  }}
/>

<div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
  <div class="period-header opening">OPENING</div>
  {#each organizedEvents.openingEvents as openingEvent}
    <div class="date-header">{formatCalendarDateTime(openingEvent.date)}</div>
    {#each openingEvent.events as post, index (index)}
      <ListingItem {post} {category} {index} {showImages} />
    {/each}
  {/each}

  <div class="period-header closing">CLOSING</div>
  {#each organizedEvents.closingEvents as closingEvent}
    <div class="date-header">{formatCalendarDateTime(closingEvent.date)}</div>
    {#each closingEvent.events as post, index (index)}
      <ListingItem {post} {category} {index} {showImages} />
    {/each}
  {/each}
</div>

<style lang="scss">
  .period-header {
    padding: var(--default-padding);
    font-weight: bold;
    font-size: var(--font-size-large);
    color: var(--white);

    &.opening {
      background: var(--orange);
    }

    &.closing {
      background: var(--blue);
    }
  }

  .date-header {
    padding: var(--default-padding);
    background: var(--grey);
    font-weight: bold;
  }
</style>
