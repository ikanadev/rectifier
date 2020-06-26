<style>
  .observation {
    border-radius: 4px;
    padding: 7px;
    font-size: 17px;
    color: #464646;
    cursor: pointer;
    height: var(--height);
    overflow: hidden;
    display: flex;
    justify-content: stretch;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #464646;
    margin-top: 10px;
  }
  .observation p {
    flex: 1;
  }
  .observation p b {
    display: block;
    text-align: right;
    font-weight: normal;
  }
  .hidden {
    padding: 7px;
    font-size: 17px;
    z-index: -10;
    height: auto;
    position: absolute;
    opacity: 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #464646;
    margin-top: 10px;
  }
  .hidden p b {
    display: block;
    text-align: right;
  }
  .expanded {
    background: #e5e5e5;
  }
  .iconCont {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--red);
    color: white;
    margin-left: 10px;
    border-radius: 5px;
  }
  .iconCont:hover {
    background: var(--darkred);
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte'
  import { afterUpdate } from 'svelte'
  import Icon from 'svelte-awesome'
  import { times } from 'svelte-awesome/icons'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let observation = { id: 0, top: 0, left: 0, text: '' }
  export let expanded = false
  export let editable = false

  const maxChars = 25
  const dispatch = createEventDispatcher()
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
    dispatch('selectObs', observation)
  }
  const onDelete = (e) => {
    e.stopPropagation()
    dispatch('delete')
  } 
  afterUpdate(() => {
    if (expanded) {
      height.set(bindRef.clientHeight)
    } else {
      height.set(40)
    }
  })
</script>

<div
  class="observation"
  on:click="{toogleExpanded}"
  style="--height:{`${$height}px`}"
  class:expanded
>
  <p>
    {text}
    <b>Por: {observation.author}</b>
  </p>
  {#if expanded && editable}
    <span class="iconCont" on:click="{onDelete}">
      <Icon data="{times}" scale="1.5" />
    </span>
  {/if}
</div>
<div class="hidden" bind:this="{bindRef}">
  <p>
    {observation.text}
    <b>Por: {observation.author}</b>
  </p>
  {#if expanded && editable}
    <span class="iconCont">
      <Icon data="{times}" scale="1.5" />
    </span>
  {/if}
</div>
