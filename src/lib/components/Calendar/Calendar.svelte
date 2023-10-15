<script lang="ts">
  import { COLOR } from "$lib/modules/types"
  import { formatCalendarDateTime } from "$lib/modules/date"
  import { fade } from "svelte/transition"
  import CalendarListingItem from "./CalendarListingItem.svelte"
  import CalendarListingHeader from "./CalendarListingHeader.svelte"
  import DecoLineTwo from "$lib/components/LandingPage/Deco/DecoLineTwo.svelte"
  import DecoLineOne from "$lib/components/LandingPage/Deco/DecoLineOne.svelte"
  import DecoCircleTwo from "../LandingPage/Deco/DecoCircleTwo.svelte"
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  export let posts: any[] = []
  export let page: any = {}

  let sortOrder = "title"
  let showOpeningImages = false
  let showClosingImages = false

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
</script>

<DecoLineTwo />

<div class="calendar">
  <!-- TEXT -->
  <div class="column text">
    <div class="inner">
      {#if $languageStore == LANGUAGE.ARABIC}
        {#if page.content_ar}
          {@html renderBlockText(page.content_ar.content)}
        {/if}
      {:else if page.content}
        {@html renderBlockText(page.content.content)}
      {/if}
    </div>
  </div>

  <div class="column list">
    <div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
      <!-- OPENING -->
      <CalendarListingHeader
        category="Opening"
        opening={true}
        {posts}
        on:sort={e => {
          sortOrder = e.detail
        }}
        on:images={e => {
          showOpeningImages = e.detail
        }}
      />
      {#each organizedEvents.openingEvents as openingEvent}
        <div class="date-header">
          <div class="inner">
            {formatCalendarDateTime(openingEvent.date)}
          </div>
        </div>
        {#each openingEvent.events as post, index (index)}
          <CalendarListingItem {post} {index} showImages={showOpeningImages} />
        {/each}
      {/each}

      <!-- CLOSING -->
      <CalendarListingHeader
        category="Closing"
        closing={true}
        {posts}
        on:sort={e => {
          sortOrder = e.detail
        }}
        on:images={e => {
          showClosingImages = e.detail
        }}
      />
      {#each organizedEvents.closingEvents as closingEvent}
        <div class="date-header">
          <div class="inner">
            {formatCalendarDateTime(closingEvent.date)}
          </div>
        </div>
        {#each closingEvent.events as post, index (index)}
          <CalendarListingItem {post} {index} showImages={showClosingImages} />
        {/each}
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .calendar {
    display: flex;
    .column {
      width: 50%;

      &.list {
        background: var(--orange);
        padding-bottom: 200px;
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;

        .inner {
          color: var(--white);
          font-size: var(--font-size-large);
          padding: var(--default-padding);
          line-height: 1.1em;
        }
      }
    }
  }

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
    .inner {
      z-index: var(--z-content);
      position: relative;
    }
  }
</style>
