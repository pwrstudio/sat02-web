<script lang="ts">
  import type { EventGroupedByDate } from "./types"
  import { formatFullDateTime } from "$lib/modules/date"
  import CalendarListingItem from "./CalendarListingItem.svelte"
  export let dateEvents: EventGroupedByDate
  export let showImages = false
  let expanded = false

  const toggleExpanded = () => {
    expanded = !expanded
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="date-header" on:click={toggleExpanded}>
  <div class="inner">
    <span class="icon">{expanded ? "↑" : "↓"}&nbsp;</span>
    {formatFullDateTime(dateEvents.date, false, true)}
  </div>
</div>

{#if expanded}
  <div>
    {#each dateEvents.events as post, index (index)}
      <CalendarListingItem {post} {showImages} />
    {/each}
  </div>
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  .date-header {
    padding: var(--default-padding);
    background: var(--grey);
    font-weight: bold;
    border-bottom: 1px solid var(--black);
    cursor: pointer;
    user-select: none;

    &:hover {
      background: var(--mid-grey);
    }

    .inner {
      z-index: var(--z-content);
      position: relative;

      .icon {
        position: relative;
        top: -1px;
      }
    }
  }
</style>
