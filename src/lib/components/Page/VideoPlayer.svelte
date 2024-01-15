<script lang="ts">
  import getVideoId from "get-video-id"

  export let url: string = ""

  function generateEmbedCode(url: string): string {
    const { id, service } = getVideoId(url)

    if (!id || !service) {
      return "Invalid URL or unsupported video service"
    }

    switch (service) {
      case "youtube":
        return `<iframe width="100%"" height="100%" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
      case "vimeo":
        return `<iframe src="https://player.vimeo.com/video/${id}" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      default:
        return "Unsupported video service"
    }
  }

  let videoEmbedCode = generateEmbedCode(url)
</script>

<div class="video">
  {@html videoEmbedCode}
</div>

<style lang="scss">
  .video {
    background: var(--grey);
    width: 720px;
    max-width: 90%;
    aspect-ratio: 16/9;
    line-height: 0;
    position: relative;
  }
</style>
