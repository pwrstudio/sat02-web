<script lang="ts">
  import OneColumn from "$lib/components/OneColumn/OneColumn.svelte"
  export let data
  const { page } = data
</script>

<OneColumn {page} />
