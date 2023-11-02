<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ARABIC)
  // ...
  import VenuePage from "$lib/components/VenuePage/VenuePage.svelte"
  export let data
  const { page, posts } = data
</script>

<VenuePage {page} {posts} />
