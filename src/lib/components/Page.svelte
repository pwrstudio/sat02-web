<script lang="ts">
  import { fade } from "svelte/transition"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import has from "lodash/has.js"

  import Tag from "./Tag.svelte"
  export let page: any

  console.log(page)
</script>

<div class="page" in:fade={{ duration: 200 }}>
  <!-- LEFT -->
  <div class="column left">
    <!-- TITLE -->
    <div class="row header orange">
      <!-- TYPE -->
      <Tag>{page._type}</Tag>
      <!-- TITLE -->
      <h1>{page.title}</h1>
      <!-- VENUE -->
      {#if has(page, "venues[0].title")}
        <Tag>
          {page.venues[0].title}
        </Tag>
      {/if}
    </div>
    <!-- CONTENT -->
    <div class="row content">
      {#if page.description}
        {@html renderBlockText(page.description.content)}
      {/if}
    </div>
  </div>

  <!-- RIGHT -->
  <div class="column right">
    <!-- PARTICIPANTS  -->
    <div class="row header green">
      {#if has(page, "participants[0].title")}
        <h2>
          {page.participants[0].title}
        </h2>
      {/if}
    </div>
    <!-- SLIDESHOW -->
    {#if page.featuredImage}
      <div class="row slideshow">
        <img
          src={urlFor(page.featuredImage)
            .width(800)
            .height(600)
            .saturation(-100)
            .auto("format")
            .quality(100)
            .url()}
          alt={page.title}
        />
        <!-- {page.processMedia.length} -->
        <a href="" class="open-slideshow"> OPEN SLIDESHOW (10) </a>
      </div>
    {/if}

    <!-- DIVIDER -->
    <div class="row divider" />
    <!-- EVENTS -->
    <div class="row events">EVENTS</div>
  </div>
</div>

<style lang="scss">
  @import "../styles/responsive.scss";

  .page {
    display: flex;

    @include screen-size("phone") {
      flex-wrap: wrap;
    }

    .column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      .row {
        width: 100%;
        padding: var(--default-padding);
      }

      .header {
        height: var(--header-height);
      }

      .slideshow {
        background: var(--grey);
        height: 500px;
        position: relative;
        padding: 0;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          //   object-fit: contain;
          object-fit: cover;
          mix-blend-mode: multiply;
          object-position: center center;
        }

        .open-slideshow {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          padding: var(--double-padding);
          background: var(--orange);
          color: var(--white);
          text-decoration: none;
          text-align: center;
        }
      }

      .divider {
        height: 60px;
        background: var(--grey);
      }

      .events {
        height: 500px;
        background: var(--green);
      }

      .content {
        padding: var(--double-padding);
      }
    }
  }

  .orange {
    background: var(--orange);
  }

  .green {
    background: var(--green);
  }

  h1,
  h2 {
    font-size: var(--font-size-large);
    font-weight: normal;
  }
</style>
