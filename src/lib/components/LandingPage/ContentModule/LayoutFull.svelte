<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { COLOR, ALIGNMENT, LANGUAGE, type Node } from "$lib/modules/types"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import Title from "$lib/components/Title.svelte"
  import { formatFullDateTime, timeUntil } from "$lib/modules/date"
  export let node: Node
</script>

<div class="layout full" class:reversed={node.alignment == ALIGNMENT.LEFT}>
  <div class="column image {LANGUAGE[$languageStore]}">
    {#if node.post.featuredImage}
      <Image {node} />
    {/if}
  </div>

  <div class="column text {LANGUAGE[$languageStore]}">
    <!-- TITLE -->
    <h2>
      <Title page={node.post} />
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
        <div class="date">
          {formatFullDateTime(node.post.dateTime)}
        </div>
        <!-- COUNTDOWN -->
        <div class="countdown">
          {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
          {timeUntil(node.post.dateTime)}
          {#if $languageStore == LANGUAGE.ARABIC}→{/if}
        </div>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .full {
    display: flex;
    padding-top: 2em;

    @include screen-size("small") {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .column {
      &.text {
        padding: var(--default-padding);
        padding-top: 0;
        padding-right: 40px;
        line-height: 1.1em;
        font-size: var(--font-size-xl);

        &.ARABIC {
          padding-right: unset;
          padding-left: 40px;
        }

        .time {
          z-index: var(--z-content);
          position: relative;
          .date {
            margin-top: 0.5em;
          }
          .countdown {
            // margin-top: 0.5em;
            font-style: italic;
          }
        }

        h2 {
          font-weight: normal;
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xl);
          text-transform: uppercase;

          @include screen-size("small") {
            font-size: var(--font-size-large);
          }
        }

        h3 {
          font-weight: normal;
          font-style: italic;
          font-size: var(--font-size-xl);
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xl);

          @include screen-size("small") {
            font-size: var(--font-size-large);
          }
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
