<script lang="ts">
  import Page from "$lib/components/Page/Page.svelte"
  export let data
  const { page } = data
</script>

<Page {page} />
