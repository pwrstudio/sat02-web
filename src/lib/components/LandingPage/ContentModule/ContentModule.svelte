<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  import has from "lodash/has.js"
  import { formatDateTime, timeUntil } from "$lib/modules/date"

  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"

  export let node: Node
  console.log(node)
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
      <!-- TODO: clean up this... -->
      <a
        href={(node.post._type == "event"
          ? "calendar"
          : node.post._type + "s") +
          "/" +
          node.post.slug.current}
      >
        <!-- QUOTE LAYOUT -->
        {#if node.layout === "quote"}
          <blockquote>
            “{node.post.pullQuote}”
          </blockquote>
          <div class="quote-title">→ {node.post.title}</div>
        {:else}
          <!-- IMAGE -->
          {#if node.post.featuredImage}
            <Image {node} />
          {/if}
          <!-- TITLE -->
          <h2>
            {node.post.title}
          </h2>
          {#if node.type == "project" || node.type == "event"}
            <h3>
              <ParticipantList
                participants={node.post.participants}
                linked={false}
              />
            </h3>
          {/if}
        {/if}
      </a>
    </div>

    <!-- META BOTTOM -->
    {#if node.type == "event" && has(node, "post.dateTime")}
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
  {/if}
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .module {
    min-height: var(--module-min-height);
    padding: var(--default-padding);
    display: flex;
    flex-direction: column;
    width: 100%;
    color: var(--white);
    flex-shrink: 2;
    flex-grow: 4;
    flex-basis: 1;
    overflow: hidden;

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
      height: 600px;
      position: relative;

      blockquote {
        font-size: var(--font-size-quote);
        font-style: normal;
        margin: 0;
        margin-bottom: var(--default-padding);
        line-height: 1em;
        padding: var(--default-padding);
        position: relative;
        z-index: var(--z-content);
      }

      .quote-title {
        font-size: var(--font-size-large);
        font-style: normal;
        font-style: italic;
        margin: 0;
        margin-bottom: var(--default-padding);
        line-height: 1em;
        padding: var(--default-padding);
        position: relative;
        z-index: var(--z-content);
      }

      h2 {
        font-weight: normal;
        font-size: var(--font-size-large);
        margin: 0;
        position: relative;
        z-index: var(--z-content);
      }

      h3 {
        padding-top: 0.5em;
        font-weight: normal;
        font-style: italic;
        font-size: var(--font-size-large);
        margin: 0;
        position: relative;
        z-index: var(--z-content);
      }
    }

    .ring {
      // position: absolute;
      // top: -50%;
      // left: 50%;
      transform: translateX(60%) translateY(-100%);
    }

    // &:hover {
    //   .content {
    //     .image-container {
    //       opacity: 0.8;
    //       transition: opacity 0.2s ease-out;
    //     }
    //   }
    // }
  }
</style>
