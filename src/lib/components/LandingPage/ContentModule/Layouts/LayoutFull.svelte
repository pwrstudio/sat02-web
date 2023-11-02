<script lang="ts">
  import has from "lodash/has.js"
  import { languageStore } from "$lib/modules/stores"
  import { ALIGNMENT, LANGUAGE, type Node } from "$lib/modules/types"
  import Image from "$lib/components/LandingPage/ContentModule/Image.svelte"
  import ParticipantList from "$lib/components/Elements/ParticipantList.svelte"
  import Title from "$lib/components/Elements/Title.svelte"
  import Blinker from "$lib/components/Graphics/Blinker.svelte"
  import PinGfx from "$lib/components/Graphics/PinGfx.svelte"
  import CalendarGfx from "$lib/components/Graphics/CalendarGfx.svelte"
  import { formatFullDateTime, timeUntil } from "$lib/modules/date"
  export let node: Node
  export let href = ""

  console.log(node)
</script>

<div class="layout full" class:reversed={node.alignment == ALIGNMENT.LEFT}>
  <div class="column image {LANGUAGE[$languageStore]}">
    <a {href} data-sveltekit-preload-data>
      {#if node.post.featuredImage}
        <Image {node} large />
      {/if}
    </a>
  </div>

  <div class="column text {LANGUAGE[$languageStore]}">
    <a {href} data-sveltekit-preload-data>
      <!-- TITLE -->
      <h2>
        {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
        <Title page={node.post} />
        {#if $languageStore == LANGUAGE.ARABIC}→{/if}
      </h2>

      <!-- PARTICIPANTS -->
      {#if node.type == "project" || node.type == "event"}
        <h3>
          <ParticipantList
            participants={node.post.participants}
            linked={false}
          />
        </h3>
      {/if}

      <!-- VENUE -->
      {#if has(node, "post.venues[0].title")}
        <!-- <div class="divider" /> -->
        <div class="venue">
          <PinGfx />
          {$languageStore == LANGUAGE.ENGLISH
            ? node.post.venues[0].title
            : node.post.venues[0].title_ar}
        </div>
      {/if}

      <!-- TIME -->
      {#if node.post._type == "event"}
        <!-- <div class="divider" /> -->
        <div class="time">
          <!-- DATE -->
          <div class="date">
            <CalendarGfx />
            {formatFullDateTime(node.post.dateTime)}
          </div>
          <!-- COUNTDOWN -->
          <div class="countdown">
            {#if $languageStore == LANGUAGE.ENGLISH}
              <Blinker />
            {/if}
            {timeUntil(node.post.dateTime)}
            {#if $languageStore == LANGUAGE.ARABIC}
              <Blinker />
            {/if}
          </div>
        </div>
      {/if}
    </a>
  </div>
</div>

<style lang="scss">
  @import "../../../../styles/responsive.scss";

  .full {
    display: flex;
    padding-top: 2em;
    min-height: unset;
    width: 100%;

    @include screen-size("small") {
      flex-direction: row;
      flex-wrap: wrap;
      padding-top: 0;
    }

    a {
      &:hover {
        color: var(--grey);
        .image-container {
          opacity: 0.8 !important;
        }
      }
    }

    .column {
      &.text {
        padding: var(--default-padding);
        padding-top: 0;
        padding-right: 0px;
        line-height: 1.1em;
        font-size: var(--font-size-xxlarge);

        @include screen-size("small") {
          font-size: var(--font-size-large);
          line-height: 1em;
          padding-right: var(--default-padding);
        }

        &.ARABIC {
          padding-right: unset;
          padding-left: 40px;
        }

        .time {
          z-index: var(--z-content);
          position: relative;
          .date {
            margin-top: 0.75em;
          }
        }

        .venue {
          z-index: var(--z-content);
          position: relative;
          margin-top: 0.75em;
        }

        h2 {
          font-weight: normal;
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          font-size: var(--font-size-xxlarge);
          margin-bottom: 0.75em;
          line-height: 1.1em;

          @include screen-size("small") {
            font-size: var(--font-size-large);
            line-height: 1em;
          }
        }

        h3 {
          font-weight: normal;
          font-style: italic;
          font-size: var(--font-size-xxlarge);
          margin: 0;
          position: relative;
          z-index: var(--z-content);
          @include screen-size("small") {
            font-size: var(--font-size-large);
          }
        }
      }
    }

    .divider {
      width: 70%;
      background: var(--white-transparent);
      height: 1.5px;
      margin-top: 0.5em;
      margin-bottom: 0.5em;
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
