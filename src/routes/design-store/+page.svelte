<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ENGLISH)
  // ...
  import DesignStore from "$lib/components/DesignStore/DesignStore.svelte"
  export let data
  const { page, storeItems } = data
</script>

<DesignStore {page} {storeItems} />
