<script lang="ts">
  import type { Node, Post } from "$lib/modules/types"
  import ContentModule from "$lib/components/LandingPage/ContentModule/ContentModule.svelte"
  import DatesModule from "$lib/components/LandingPage/Special/DatesModule.svelte"
  import GeoModule from "$lib/components/LandingPage/Special/GeoModule.svelte"
  import SquareDecoModule from "$lib/components/LandingPage/Special/SquareDecoModule.svelte"
  import FullWidthDecoModule from "$lib/components/LandingPage/Special/FullWidthDecoModule.svelte"
  import DotLineModule from "./Special/DotLineModule.svelte"
  import MapModule from "$lib/components/LandingPage/Special/MapModule.svelte"
  export let node: Node
  export let venues: Post[]

  const getComponent = (type: string) => {
    switch (type) {
      case "project":
        return { component: ContentModule, props: { node } }
      case "participant":
        return { component: ContentModule, props: { node } }
      case "event":
        return { component: ContentModule, props: { node } }
      case "fieldNote":
        return { component: ContentModule, props: { node } }
      case "any":
        return { component: ContentModule, props: { node } }
      case "dates":
        return { component: DatesModule, props: { node } }
      case "geo":
        return { component: GeoModule, props: { node } }
      case "map":
        return { component: MapModule, props: { node, venues } }
      case "squareDeco":
        return { component: SquareDecoModule, props: { node } }
      case "fullWidthDeco":
        return { component: FullWidthDecoModule, props: { node } }
      case "dotLine":
        return { component: DotLineModule, props: { node } }
      default:
        return { component: null, props: { node } }
    }
  }

  const moduleComponent = getComponent(node.type)
</script>

<svelte:component this={moduleComponent.component} {...moduleComponent.props} />
