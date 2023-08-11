<script lang="ts">
  import Page from "$lib/components/Page.svelte"
  export let data
  const { page } = data
</script>

<Page {page} />
