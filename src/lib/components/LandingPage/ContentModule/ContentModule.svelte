<script lang="ts">
  import { COLOR, LAYOUT, type Node } from "$lib/modules/types"
  import has from "lodash/has.js"
  import { formatDateTime, timeUntil } from "$lib/modules/date"

  import Tag from "$lib/components/Tag.svelte"
  import Borders from "$lib/components/LandingPage/ContentModule/Borders.svelte"
  import LayoutQuote from "$lib/components/LandingPage/ContentModule/LayoutQuote.svelte"
  import LayoutImage from "$lib/components/LandingPage/ContentModule/LayoutImage.svelte"
  import LayoutFull from "$lib/components/LandingPage/ContentModule/LayoutFull.svelte"
  import { urlPrefix } from "$lib/modules/stores"

  export let node: Node

  let url =
    $urlPrefix +
    (node.post._type == "event" ? "calendar" : node.post._type + "s") +
    "/" +
    node.post.slug.current
</script>

<div
  class="module"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  {#if node.post}
    <!-- META TOP -->
    <div class="meta-top">
      <!-- TYPE -->
      <Tag border={node.bgColor === COLOR.WHITE}>
        {node.post._type}
      </Tag>
      <!-- VENUE -->
      {#if has(node, "post.venues[0].title")}
        <Tag border={node.bgColor === COLOR.WHITE}>
          {node.post.venues[0].title}
        </Tag>
      {/if}
    </div>

    <!-- CONTENT -->
    <div class="content">
      <a href={url}>
        <!-- QUOTE LAYOUT -->
        {#if node.layout === LAYOUT.QUOTE}
          <LayoutQuote {node} />
        {/if}
        <!-- IMAGE LAYOUT -->
        {#if node.layout == LAYOUT.IMAGE}
          <LayoutImage {node} />
        {/if}
        <!-- FULL LAYOUT -->
        {#if node.layout == LAYOUT.FULL}
          <LayoutFull {node} />
        {/if}
      </a>
    </div>

    <!-- DATE & COUNTDOWN -->
    {#if node.layout != LAYOUT.FULL && node.type == "event" && has(node, "post.dateTime")}
      <div class="meta-bottom">
        <!-- DATE -->
        <Tag style="rounded" border={node.bgColor === COLOR.WHITE}>
          {formatDateTime(node.post.dateTime)}
        </Tag>
        <!-- COUNTDOWN -->
        <Tag style="rounded" border={node.bgColor === COLOR.WHITE}>
          {timeUntil(node.post.dateTime)}
        </Tag>
      </div>
    {/if}

    <!-- BORDERS -->
    {#if node.border}
      <Borders
        border={node.border}
        color={node.bgColor == COLOR.WHITE ? COLOR.BLACK : COLOR.WHITE}
      />
    {/if}
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .module {
    min-height: var(--module-min-height);
    padding: var(--double-padding);
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--white);
    flex-shrink: 2;
    flex-grow: 4;
    overflow: hidden;
    user-select: none;
    position: relative;

    @include screen-size("small") {
      min-height: unset;
    }

    &.white {
      background: var(--white);
      color: var(--black);
    }

    &.orange {
      background: var(--orange);
    }

    &.blue {
      background: var(--blue);
    }

    &.green {
      background: var(--green);
    }

    &.purple {
      background: var(--purple);
    }

    .meta-top {
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }

    .meta-bottom {
      width: 100%;
      margin-bottom: var(--default-padding);
      display: flex;
      justify-content: space-between;
    }

    .content {
      line-height: 1.6em;
      min-height: 500px;
      position: relative;
    }
  }
</style>
