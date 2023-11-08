<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import Title from "../Elements/Title.svelte"
  export let page: any

  let hasImage: boolean
  $: hasImage = page.featuredImage && page.featuredImage.asset
</script>

<!-- TITLE HEADER -->
<div class="title-header" class:tall={hasImage}>
  <!-- TITLE -->
  <h1>
    {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
    {#if $languageStore == LANGUAGE.ARABIC}←{/if}
    <Title {page} />
  </h1>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .title-header {
    position: relative;
    padding: var(--default-padding);
    width: 100%;
    background: var(--green);
    color: var(--white);
    display: flex;

    padding-top: 2em;
    padding-bottom: 2em;

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
