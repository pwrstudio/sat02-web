<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE } from "$lib/modules/types"
  export let page: any
  let uppercase = false
  $: uppercase = page._type == "project" || page._type == "event"
</script>

{#if $languageStore == LANGUAGE.ARABIC}
  <span class="title" dir="rtl">
    {page.title_ar ? page.title_ar : page.title}
  </span>
{:else}
  <span class="title">{page.title}</span>
{/if}

<style lang="scss">
  .title {
    font-weight: bold;
    // text-transform: uppercase;
  }
</style>
