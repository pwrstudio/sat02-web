<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import { urlFor } from "$lib/modules/sanity"
  import Title from "../Elements/Title.svelte"
  export let page: any
  console.log(page)

  let hasImage: boolean
  $: hasImage = page.featuredImage && page.featuredImage.asset
</script>

<!-- HEADER -->
<div class="header" class:tall={hasImage}>
  <div class="header-column left">
    <!-- TITLE -->
    <h1>
      {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
      <Title {page} />
      {#if $languageStore == LANGUAGE.ARABIC}→{/if}
    </h1>
  </div>
  <div class="header-column right">
    {#if hasImage}
      <img
        src={urlFor(page.featuredImage)
          .width(700)
          .height(500)
          .saturation(-100)
          .auto("format")
          .quality(100)
          .url()}
        alt={page.title}
      />
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .header {
    height: 300px;
    position: relative;
    padding: var(--default-padding);
    width: 100%;
    background: var(--green);
    color: var(--white);
    display: flex;

    &.tall {
      height: var(--header-height);
      @include screen-size("phone") {
        height: unset;
      }
    }

    @include screen-size("phone") {
      height: unset;
    }

    .header-column {
      width: 50%;

      @include screen-size("phone") {
        width: 100%;
      }

      &.left {
        padding-top: 2em;
      }

      &.right {
        padding-top: 2em;
        display: flex;
        justify-content: center;
        align-items: center;

        @include screen-size("phone") {
          display: none;
        }

        img {
          position: relative;
          z-index: var(--z-content);
          height: 90%;
          max-width: 90%;
          object-fit: cover;
          margin-bottom: var(--default-padding);
          // mix-blend-mode: multiply;
          position: relative;
          z-index: var(--z-content);
        }
      }
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
  }
</style>
