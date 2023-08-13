<script lang="ts">
  import MainModule from "$lib/components/LandingPage/MainModule.svelte"
  import DatesModule from "$lib/components/LandingPage/DatesModule.svelte"
  import GeoModule from "$lib/components/LandingPage/GeoModule.svelte"
  import SquareDecoModule from "$lib/components/LandingPage/SquareDecoModule.svelte"
  import FullWidthDecoModule from "$lib/components/LandingPage/FullWidthDecoModule.svelte"
  import SubtitleModule from "$lib/components/LandingPage/SubtitleModule.svelte"
  export let data
  const { frontpage } = data
</script>

<div class="landing-container">
  {#each frontpage as post}
    <MainModule {post} />
  {/each}
  <DatesModule />
  <SquareDecoModule />
  <GeoModule />
  <FullWidthDecoModule />
  <SubtitleModule />
</div>

<style lang="scss">
  .landing-container {
    display: flex;
    flex-wrap: wrap;
  }
</style>
