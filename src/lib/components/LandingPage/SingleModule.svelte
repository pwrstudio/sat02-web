<script lang="ts">
  import ContentModule from "$lib/components/LandingPage/ContentModule.svelte"
  import DatesModule from "$lib/components/LandingPage/Special/DatesModule.svelte"
  import GeoModule from "$lib/components/LandingPage/Special/GeoModule.svelte"
  import SquareDecoModule from "$lib/components/LandingPage/Special/SquareDecoModule2.svelte"
  import SquareAnimationModule from "$lib/components/LandingPage/Special/SquareAnimationModule.svelte"
  import FullWidthDecoModule from "$lib/components/LandingPage/Special/FullWidthDecoModule.svelte"
  import SubtitleModule from "$lib/components/LandingPage/Special/SubtitleModule.svelte"
  import DotLineModule from "./Special/DotLineModule.svelte"
  import MapModule from "$lib/components/LandingPage/Special/MapModule.svelte"
  export let node: any

  const getComponent = (type: string) => {
    switch (type) {
      case "project":
        return { component: ContentModule, props: { node } }
      case "participant":
        return { component: ContentModule, props: { node } }
      case "event":
        return { component: ContentModule, props: { node } }
      case "dates":
        return { component: DatesModule, props: {} }
      case "geo":
        return { component: GeoModule, props: {} }
      case "map":
        return { component: MapModule, props: {} }
      case "squareDeco":
        return { component: SquareDecoModule, props: {} }
      case "squareAnimation":
        return { component: SquareAnimationModule, props: {} }
      case "fullWidthDeco":
        return { component: FullWidthDecoModule, props: {} }
      case "subtitle":
        return { component: SubtitleModule, props: {} }
      case "dotLine":
        return { component: DotLineModule, props: {} }
      default:
        return { component: null, props: {} }
    }
  }

  const moduleComponent = getComponent(node.type)
</script>

<svelte:component this={moduleComponent.component} {...moduleComponent.props} />
