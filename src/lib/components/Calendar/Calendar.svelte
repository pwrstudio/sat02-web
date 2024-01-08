<script lang="ts">
  import { onMount, tick } from "svelte"
  import { fade } from "svelte/transition"
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, type Post } from "$lib/modules/types"
  import type { EventsByPeriod, Event } from "./types"

  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  import CalendarListingHeader from "./CalendarListingHeader.svelte"
  import TitleHeader from "../Elements/TitleHeader.svelte"
  import SlideshowHeader from "../Elements/SlideshowHeader.svelte"
  import DecoCalendar from "../Deco/DecoCalendar.svelte"
  import DateSection from "./DateSection.svelte"

  export let posts: Post[] = []
  export let page: Post = {} as Post

  let showOpeningImages = false
  let showClosingImages = false

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
        eventsByDateAndPeriod[date] = { openingEvent: [], closingEvent: [] }
      }
      eventsByDateAndPeriod[date][event.period].push(event)
    }

    // Sort events by date in descending order
    const sortedDates = Object.keys(eventsByDateAndPeriod).sort((a, b) => {
      const dateA = new Date(a)
      const dateB = new Date(b)
      return dateB.getTime() - dateA.getTime()
    })

    // Initialize the object to store the organized events
    const organizedEvents: EventsByPeriod = {
      openingEvents: [],
      closingEvents: [],
    }

    // Iterate through the sorted dates
    for (const date of sortedDates) {
      // Sort opening events by ascending time within each date
      const openingEvents = eventsByDateAndPeriod[date].openingEvent.sort(
        (a, b) => a.dateTime.localeCompare(b.dateTime),
      )

      // Sort closing events by ascending time within each date
      const closingEvents = eventsByDateAndPeriod[date].closingEvent.sort(
        (a, b) => a.dateTime.localeCompare(b.dateTime),
      )

      // Add opening events for this date if any
      if (openingEvents.length > 0) {
        organizedEvents.openingEvents.push({ date, events: openingEvents })
      }

      // Add closing events for this date if any
      if (closingEvents.length > 0) {
        organizedEvents.closingEvents.push({ date, events: closingEvents })
      }
    }

    return organizedEvents
  }

  const organizedEvents = organizeAndSortEvents(posts)

  let height = 0

  const handleResize = async () => {
    await tick()
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
  <DecoCalendar />
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
      {#if posts.filter(post => post.period == "closingEvent").length > 0}
        <!-- CLOSING -->
        <CalendarListingHeader
          category="Closing"
          closing={true}
          posts={posts.filter(post => post.period == "closingEvent")}
          on:images={e => {
            showClosingImages = e.detail
          }}
        />
        {#each organizedEvents.closingEvents as closingEvent}
          <DateSection
            dateEvents={closingEvent}
            showImages={showClosingImages}
          />
        {/each}
      {/if}

      <!-- OPENING -->
      <CalendarListingHeader
        category="Opening"
        opening={true}
        posts={posts.filter(post => post.period == "openingEvent")}
        on:images={e => {
          showOpeningImages = e.detail
        }}
      />
      {#each organizedEvents.openingEvents as openingEvent}
        <DateSection dateEvents={openingEvent} showImages={showOpeningImages} />
      {/each}
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
        background: var(--purple);
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

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
