<script lang="ts">
  import Tag from "$lib/components/Tag.svelte"
  export let page: any

  let mediaList = page.processMedia || page.media || []

  let slideCount = 1

  if (mediaList?.length > 0) {
    slideCount = mediaList.length
  }
</script>

<span>({slideCount}) <Tag>6.2MB</Tag></span>
