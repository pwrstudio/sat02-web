<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  languageStore.set(LANGUAGE.ENGLISH)
  // ...
  import OneColumn from "$lib/components/OneColumn/OneColumn.svelte"
  export let data
  const { page } = data
</script>

<OneColumn {page} />
