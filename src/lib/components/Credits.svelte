<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  export let page: any
</script>

<div class="credits">
  {#if $languageStore == LANGUAGE.ARABIC}
    {#if page.credits_ar}
      {@html renderBlockText(page.credits_ar.content)}
    {/if}
  {:else if page.credits}
    {#if page.credits}
      {@html renderBlockText(page.credits.content)}
    {/if}
  {/if}
</div>

<style lang="scss">
  .credits {
    font-size: var(--font-size-small);
  }
</style>
