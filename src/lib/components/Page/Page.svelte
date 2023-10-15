<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { fade } from "svelte/transition"
  import { urlFor } from "$lib/modules/sanity"
  import has from "lodash/has.js"
  import { formatFullDateTime } from "$lib/modules/date"

  import Slideshow from "$lib/components/Page/Slideshow.svelte"
  import Tag from "$lib/components/Tag.svelte"
  import Title from "$lib/components/Title.svelte"
  import Content from "$lib/components/Content.svelte"
  import Credits from "$lib/components/Credits.svelte"
  import ParticipantList from "$lib/components/ParticipantList.svelte"
  import SlidesCounter from "./SlidesCounter.svelte"
  import DecoPage from "$lib/components/LandingPage/Deco/DecoPage.svelte"
  import DecoPageTwo from "$lib/components/LandingPage/Deco/DecoPageTwo.svelte"
  import { onMount } from "svelte"
  import { languageStore } from "$lib/modules/stores"
  export let page: any

  let slideshowOpen = false
  let height = 0

  const toogleSlideshow = () => {
    slideshowOpen = !slideshowOpen
  }

  const handleResize = () => {
    height = document.body.scrollHeight
  }

  onMount(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
  })
</script>

<!-- DECO -->
<div class="deco-container" style={"height:" + height + "px;"}>
  {#if page._type == "participant"}
    <DecoPageTwo />
  {:else}
    <DecoPage />
  {/if}
</div>

<div class="page {page._type}" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column left">
    <!-- TITLE -->
    <div class="row header green">
      <!-- TYPE -->
      <div class="tag">
        <Tag>{page._type}</Tag>
      </div>
      <!-- TITLE -->
      <h1>
        {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
        <Title {page} />
        {#if $languageStore == LANGUAGE.ARABIC}→{/if}
      </h1>
      <!-- PARTICIPANTS -->
      <h2>
        <ParticipantList participants={page.participants} />
      </h2>

      <div class="phone-info">
        <!-- VENUE -->
        {#if has(page, "venues[0].title")}
          <div class="venue">
            <a href={"/venues/" + page.venues[0].slug.current}>
              {page.venues[0].title}
            </a>
          </div>
        {/if}

        <!-- TIME -->
        {#if page._type == "event"}
          <div class="time">
            <!-- DATE -->
            <div class="date">
              {formatFullDateTime(page.dateTime)}
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="row content">
      <!-- CONTENT -->
      <Content {page} />
      <!-- CREDITS -->
      <Credits {page} />
    </div>
  </div>

  <!-- RIGHT -->
  <div class="column right">
    <div class="row header right green">
      <!-- VENUE -->
      {#if has(page, "venues[0].title")}
        <div class="venue">
          <a href={"/venues/" + page.venues[0].slug.current}>
            {page.venues[0].title}
          </a>
        </div>
      {/if}

      <!-- TIME -->
      {#if page._type == "event"}
        <div class="time">
          <!-- DATE -->
          <div class="date">
            {formatFullDateTime(page.dateTime)}
          </div>
        </div>
      {/if}
    </div>

    <!-- SLIDESHOW -->
    {#if page.featuredImage?.asset}
      <div class="row slideshow">
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <img
          src={urlFor(page.featuredImage)
            .width(800)
            .height(600)
            .saturation(-100)
            .auto("format")
            .quality(100)
            .url()}
          alt={page.title}
          on:click={toogleSlideshow}
        />
        <button
          on:click={toogleSlideshow}
          class="open-slideshow {LANGUAGE[$languageStore]}"
        >
          {#if $languageStore === LANGUAGE.ARABIC}
            فتح العرض التقديمي <SlidesCounter {page} />
          {:else}
            OPEN SLIDESHOW <SlidesCounter {page} />
          {/if}
        </button>
      </div>
    {/if}
    <!-- EVENTS -->
    <div class="row events">
      <!-- RELATED EVENTS -->
    </div>
  </div>
</div>

{#if slideshowOpen}
  <Slideshow {page} on:close={toogleSlideshow} />
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  .page {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .tag {
      position: absolute;
      top: 20px;
      left: 20px;
    }

    .column {
      width: 50%;
      display: flex;
      flex-grow: 1;
      flex-direction: column;

      @include screen-size("phone") {
        width: 100%;
      }

      .row {
        width: 100%;
        padding: var(--default-padding);

        &.right {
          // padding-top: 8em;
        }
      }

      .header {
        height: var(--header-height);
        position: relative;
        padding-top: 5em;

        @include screen-size("phone") {
          height: unset;
        }

        h1,
        h2 {
          font-size: var(--font-size-xlarge);
          font-weight: normal;
          position: relative;
          z-index: var(--z-content);
          line-height: 1.1em;
          padding: 0;
          margin: 0;
          margin-bottom: 0.5em;

          @include screen-size("phone") {
            font-size: var(--font-size-large);
            line-height: 0.9em;
          }

          a {
            color: var(--white);
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }

        h2 {
          font-style: italic;
        }

        .time {
          font-size: var(--font-size-xlarge);
          font-weight: normal;
          position: relative;
          z-index: var(--z-content);
          line-height: 1.1em;
          margin-bottom: 0.5em;

          @include screen-size("phone") {
            font-size: var(--font-size-large);
          }
        }

        .venue {
          font-size: var(--font-size-xlarge);
          font-weight: normal;
          position: relative;
          z-index: var(--z-content);
          line-height: 1.1em;
          margin-bottom: 0.5em;

          @include screen-size("phone") {
            font-size: var(--font-size-large);
          }
        }

        &.right {
          @include screen-size("phone") {
            display: none;
          }
        }
      }

      .slideshow {
        background: var(--grey);
        height: 600px;
        position: relative;
        padding: 0;
        cursor: pointer;
        z-index: var(--z-content);

        @include screen-size("phone") {
          height: 400px;
        }

        img {
          width: 100%;
          height: 100%;
          //   object-fit: contain;
          object-fit: cover;
          mix-blend-mode: multiply;
          object-position: center center;

          @include screen-size("phone") {
            object-fit: contain;
          }
        }

        .open-slideshow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          padding: var(--default-padding);
          background: var(--orange);
          color: var(--white);
          text-decoration: none;
          text-align: center;
          border: 0;
          cursor: pointer;
          font-size: var(--font-size-normal);

          &.ARABIC {
            font-family: var(--font-family-arabic);
          }
        }
      }

      .divider {
        height: 60px;
        background: var(--grey);
      }

      .events {
        min-height: 500px;
        background: var(--green);
        flex-grow: 1;
      }

      .content {
        padding: var(--default-padding);
      }
    }
  }

  .orange {
    background: var(--orange);
  }

  .green {
    background: var(--green);
    color: var(--white);
    line-height: 1.6em;
  }

  .deco-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .phone-info {
    display: none;
    @include screen-size("phone") {
      display: block;
    }
  }
</style>
