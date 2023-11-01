<script lang="ts">
  import { onMount } from "svelte"
  import { formatFullDateTime } from "$lib/modules/date"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import CalendarListingItem from "./CalendarListingItem.svelte"
  import CalendarListingHeader from "./CalendarListingHeader.svelte"
  import DecoLineTwo from "$lib/components/Deco/DecoLineTwo.svelte"
  import TitleHeader from "../Elements/TitleHeader.svelte"
  import SlideshowHeader from "../Elements/SlideshowHeader.svelte"

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

  let height = 0

  const handleResize = () => {
    height = document.body.scrollHeight
  }

  onMount(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })
</script>

<!-- METADATA -->
<Metadata {page} />

<div class="deco-container" style={"height:" + height + "px;"}>
  <DecoLineTwo />
</div>

<div class="calendar">
  <!-- TEXT -->
  <div class="column text">
    <!-- HEADER: TITLE -->
    <TitleHeader {page} />
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
    <!-- HEADER: SLIDESHOW -->
    <SlideshowHeader {page} />
    <div class="listing" in:fade={{ duration: 200, delay: 1000 }}>
      <!-- OPENING -->
      <CalendarListingHeader
        category="Opening"
        opening={true}
        posts={posts.filter(post => post.period == "openingEvent")}
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
            {formatFullDateTime(openingEvent.date, false)}
          </div>
        </div>
        {#each openingEvent.events as post, index (index)}
          <CalendarListingItem {post} showImages={showOpeningImages} />
        {/each}
      {/each}

      {#if posts.filter(post => post.period == "closingEvent").length > 0}
        <!-- CLOSING -->
        <CalendarListingHeader
          category="Closing"
          closing={true}
          posts={posts.filter(post => post.period == "closingEvent")}
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
              {formatFullDateTime(closingEvent.date, false)}
            </div>
          </div>
          {#each closingEvent.events as post, index (index)}
            <CalendarListingItem {post} showImages={showClosingImages} />
          {/each}
        {/each}
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .calendar {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      &.list {
        background: var(--orange);
        padding-bottom: 200px;
      }

      &.text {
        background: var(--green);
        padding-bottom: 200px;

        @include screen-size("phone") {
          padding-bottom: 0px;
        }

        .inner {
          color: var(--white);
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

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
