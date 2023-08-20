<script lang="ts">
  import { COLOR, ALIGNMENT, type Node } from "$lib/modules/types"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import { formatFullDateTime, timeUntil } from "$lib/modules/date"
  export let node: Node
</script>

<div class="layout full" class:reversed={node.alignment == ALIGNMENT.LEFT}>
  <div class="column image">
    {#if node.post.featuredImage}
      <Image {node} />
    {/if}
  </div>

  <div class="column text">
    <!-- TITLE -->
    <h2>
      {node.post.title}
    </h2>
    <!-- PARTICIPANTS -->
    {#if node.type == "project" || node.type == "event"}
      <h3>
        <ParticipantList participants={node.post.participants} linked={false} />
      </h3>
    {/if}
    <!-- TIME -->
    {#if node.type == "event"}
      <div class="time">
        <!-- DATE -->
        <Tag style="rounded" border={node.bgColor === COLOR.WHITE} caps={false}>
          {formatFullDateTime(node.post.dateTime)}
        </Tag>
        <!-- COUNTDOWN -->
        <Tag style="rounded" border={node.bgColor === COLOR.WHITE} caps={false}>
          {timeUntil(node.post.dateTime)}
        </Tag>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .full {
    display: flex;
    padding-top: 2em;

    .column {
      &.text {
        padding: var(--default-padding);
        padding-top: 0;
        padding-right: 40px;
        line-height: 1.1em;
        font-size: var(--font-size-xl);

        h2 {
          font-weight: normal;
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xl);
        }

        h3 {
          font-weight: normal;
          font-style: italic;
          font-size: var(--font-size-xl);
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xl);
        }
      }
    }

    &.reversed {
      flex-direction: row-reverse;

      .column {
        &.text {
          padding-left: 0;
        }
        &.image {
          display: flex;
          justify-content: center;
          // justify-content: flex-end;
        }
      }
    }
  }
</style>
