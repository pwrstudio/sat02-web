<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ENGLISH)
  // ...
  import Venues from "$lib/components/Venues/Venues.svelte"
  export let data
  const { posts, page } = data
</script>

<Venues {posts} {page} />
