<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  export let page: any
  console.log(page)
</script>

{#if $languageStore == LANGUAGE.ARABIC}
  {#if page.description_ar && page.description_ar.content}
    {@html renderBlockText(page.description_ar.content)}
  {:else if page.content_ar && page.content_ar.content}
    {@html renderBlockText(page.content_ar.content)}
  {/if}
{:else if page.description && page.description.content}
  {@html renderBlockText(page.description.content)}
{:else if page.content && page.content.content}
  {@html renderBlockText(page.content.content)}
{/if}
