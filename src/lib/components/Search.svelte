<script lang="ts">
  import { LANGUAGE } from "$lib/modules/types"
  import { languageStore } from "$lib/modules/stores"
</script>

<span>
  {$languageStore === LANGUAGE.ENGLISH ? "Search..." : "يبحث"}
</span>
