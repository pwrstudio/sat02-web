<script lang="ts">
  import { renderBlockText } from "$lib/modules/sanity"
  import PlaceholderText from "$lib/components/Page/PlaceholderText.svelte"
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  export let page: any
</script>

{#if $languageStore == LANGUAGE.ARABIC}
  {#if page.description_ar}
    {@html renderBlockText(page.description_ar.content)}
  {:else}
    <PlaceholderText />
  {/if}
{:else if page.description}
  {@html renderBlockText(page.description.content)}
{:else}
  <PlaceholderText />
{/if}
