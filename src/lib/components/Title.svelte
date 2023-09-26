<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  export let page: any
</script>

{#if $languageStore == LANGUAGE.ARABIC}
  <span dir="rtl">
    {page.title_ar ? page.title_ar : page.title}
  </span>
{:else}
  <span>{page.title}</span>
{/if}
