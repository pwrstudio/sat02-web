<script lang="ts">
  import { COLOR, type Node } from "$lib/modules/types"
  import { getSharjahTime } from "$lib/modules/date"
  import { getSharjahWeather } from "$lib/modules/weather"

  export let node: Node

  let currentTime: string = ""
  let currentWeather: string = "..."

  const updateTime = () => {
    currentTime = getSharjahTime()
  }

  const updateWeather = async () => {
    currentWeather = await getSharjahWeather()
  }

  updateTime()
  updateWeather()

  setInterval(updateTime, 60000)
  setInterval(updateWeather, 60000)
</script>

<div
  class="geo"
  class:white={node.bgColor == COLOR.WHITE}
  style={"background-color: " + node.bgColor + ";"}
>
  <div class="inner">
    <div class="location">Sharjah, UAE</div>
    <div class="time">{currentTime}</div>
    <div class="weather">{currentWeather}</div>
  </div>
</div>

<style lang="scss">
  @import "../../../styles/responsive.scss";

  .geo {
    font-size: var(--font-size-large);
    color: var(--black);
    width: 100%;
    padding: var(--default-padding);
    background: var(--grey);
    min-height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: var(--z-content);
    }
  }
</style>
