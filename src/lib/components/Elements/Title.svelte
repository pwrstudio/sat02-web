<script lang="ts">
  import { languageStore } from "$lib/modules/stores"
  import { LANGUAGE, type Post } from "$lib/modules/types"
  export let page: Post
</script>

{#if $languageStore == LANGUAGE.ARABIC}
  <span class="title" dir="rtl">
    {page.title_ar ? page.title_ar : page.title}
  </span>
{:else}
  <span class="title">{page.title}</span>
{/if}

<style lang="scss">
  @import "../../styles/responsive.scss";

  .title {
    font-weight: bold;
  }
</style>
