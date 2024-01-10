<script lang="ts">
  import RoundTag from "$lib/components/Elements/RoundTag.svelte"
  import { COLOR, type Post } from "$lib/modules/types"
  export let page: Post

  let mediaList = page.processMedia || page.media || page.images || []

  if (page.featuredImage) {
    mediaList = [page.featuredImage, ...mediaList]
  }

  let slideCount = 1

  if (mediaList?.length > 0) {
    slideCount = mediaList.length
  }
</script>

<span><RoundTag>{slideCount}</RoundTag></span>
