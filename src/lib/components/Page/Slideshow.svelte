<script lang="ts">
  import { fade } from "svelte/transition"
  import { createEventDispatcher } from "svelte"
  import { urlFor, renderBlockText } from "$lib/modules/sanity"
  import has from "lodash/has.js"
  export let page: any

  const dispatch = createEventDispatcher()

  console.log("page", page)

  const sendClose = () => {
    dispatch("close")
  }
</script>

<div class="slideshow" in:fade={{ duration: 100 }}>
  <button class="close" on:click={sendClose}>CLOSE</button>
</div>

<style lang="scss">
  @import "../../styles/responsive.scss";

  .slideshow {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background: var(--green);
    z-index: 10000;
  }
</style>
