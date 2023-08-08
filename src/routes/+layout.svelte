<script lang="ts">
  import MenuBar from "$lib/components/MenuBar.svelte"
  import Footer from "$lib/components/Footer.svelte"
</script>

<MenuBar />
<main>
  <slot />
</main>
<Footer />

<style lang="scss">
  main {
    min-height: 80vh;
    padding-top: var(--menubar-height);
  }
</style>
