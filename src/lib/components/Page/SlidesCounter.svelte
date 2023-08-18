<script lang="ts">
  import Tag from "$lib/components/Tag.svelte"
  export let page: any

  let slideCount = 1

  if (page.processMedia?.length > 0) {
    slideCount = page.processMedia.length
  }
</script>

<span>({slideCount}) <Tag>6.2MB</Tag></span>
