<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, type Node } from "$lib/modules/types"
  import Title from "$lib/components/Elements/Title.svelte"
  export let node: Node
  export let href = ""
</script>

<div class="layout quote">
  <a {href} data-sveltekit-preload-data>
    <blockquote>
      “{node.post.pullQuote}”
    </blockquote>
    <div class="quote-title">
      {#if $languageStore == LANGUAGE.ENGLISH}→{/if}
      {#if $languageStore == LANGUAGE.ARABIC}←{/if}
      <Title page={node.post} />
    </div>
  </a>
</div>

<style lang="scss">
  @import "../../../../styles/responsive.scss";

  .quote {
    a {
      &:hover {
        color: var(--grey);
      }
    }

    blockquote {
      font-size: var(--font-size-large);
      font-style: normal;
      margin: 0;
      margin-bottom: 0.5em;
      line-height: 1.1em;
      padding: var(--default-padding);
      padding-left: 0;
      position: relative;
      z-index: var(--z-content);
      padding-bottom: 0;
      margin-top: 0;
      padding-top: 0;
    }

    .quote-title {
      font-size: var(--font-size-large);
      font-style: normal;
      font-style: italic;
      margin: 0;
      line-height: 1.1em;
      padding: var(--default-padding);
      padding-top: 0;
      padding-left: 0;
      position: relative;
      z-index: var(--z-content);
    }
  }
</style>
