<style>
  .observation {
    padding: 7px;
    font-size: 17px;
    color: #464646;
    cursor: pointer;
    height: var(--height);
    overflow: hidden;
    display: flex;
    justify-content: stretch;
    align-items: center;
  }
  .observation p {
    flex: 1;
  }
  .hidden {
    padding: 7px;
    font-size: 17px;
    z-index: -10;
    height: auto;
    position: absolute;
    opacity: 0;
  }
</style>

<script>
  import Icon from 'svelte-awesome'
  import { plus, minus } from 'svelte-awesome/icons'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let observation = { id: 0, top: 0, left: 0, text: '' }

  const maxChars = 20
  let expanded = false
  let bindRef
  $: text = expanded
    ? observation.text
    : `${observation.text.slice(0, maxChars)}${
        observation.text.length > maxChars ? '...' : ''
      }`

  let height = tweened(40, {
    duration: 400,
    easing: cubicOut,
  })
  const toogleExpanded = () => {
    if (!expanded) {
      height.set(bindRef.clientHeight)
    } else {
      height.set(40)
    }
    expanded = !expanded
  }
</script>

<div
  class="observation"
  on:click="{toogleExpanded}"
  style="--height:{`${$height}px`}"
>
  <p>{text}</p>
  {#if observation.text.length > maxChars}
    <span>
      <Icon data="{expanded ? minus : plus}" scale="1.2" />
    </span>
  {/if}
</div>
<div class="hidden" bind:this="{bindRef}">
  <p>{observation.text}</p>
</div>
