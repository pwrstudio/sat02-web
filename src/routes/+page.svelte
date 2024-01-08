<script lang="ts">
  // Set language
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
  import Metadata from "$lib/components/Metadata/Metadata.svelte"
  languageStore.set(LANGUAGE.ENGLISH)
  // ...
  import Section from "$lib/components/LandingPage/Section.svelte"
  export let data
  const { frontpage, topSection, venues } = data
</script>

<!-- METADATA -->
<Metadata />

{#each topSection as node}
  {#if node.type === "section"}
    <Section {node} {venues} />
  {/if}
{/each}

{#each frontpage as node}
  {#if node.type === "section"}
    <Section {node} {venues} />
  {/if}
{/each}
