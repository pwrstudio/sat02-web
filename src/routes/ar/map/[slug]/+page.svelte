<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import Page from "$lib/components/Page/Page.svelte"
  export let data
  const { page, posts } = data
</script>

<Page {page} {posts} />
