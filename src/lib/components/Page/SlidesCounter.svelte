<script lang="ts">
  import RoundTag from "$lib/components/RoundTag.svelte"
  export let page: any

  let mediaList = page.processMedia || page.media || []

  let slideCount = 1

  if (mediaList?.length > 0) {
    slideCount = mediaList.length
  }
</script>

<span><RoundTag>{slideCount}</RoundTag></span>
