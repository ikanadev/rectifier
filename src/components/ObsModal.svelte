<style>
  div {
    position: fixed;
    top: var(--top);
    left: var(--left);
    z-index: 10;
    border-radius: 8px;
    width: 400px;
    min-height: 80px;
    background: white;
    padding: 2px 25px;
    padding-bottom: 20px;
    box-shadow: 2px 2px 4px 2px #54545466;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  div::before {
    content: '\00a0';
    display: block;
    box-shadow: 2px 2px 4px 2px #54545466;
    background: #f83e06;
    border: none;
    position: relative;
    top: 18px;
    left: -35px;
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    z-index: 0;
  }
  .titleCont {
    width: 100%;
    display: flex;
  }
  :global(.modalIcon) {
    color: #999;
    cursor: pointer;
  }
  :global(.modalIcon):hover {
    color: #777;
  }
  textarea {
    border: none;
    padding: 4px 0;
    border: 0.5px solid #999;
    border-radius: 6px;
    padding: 5px 7px;
    font-size: 1em;
    resize: vertical;
    font-weight: 300;
  }
  textarea:focus {
    outline: none;
  }
  h6 {
    flex: 1;
    font-size: 1.2em;
    color: #f83e06;
    margin-bottom: 8px;
    letter-spacing: 0.1em;
  }
  button {
    font-weight: bold;
    letter-spacing: 0.2em;
    border-radius: 6px;
    border: none;
    height: 35px;
    color: white;
    background: #f83e06;
    margin-top: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover {
    background: #fa4e16;
  }
  .disabled,
  .disabled:hover {
    background: var(--disabled);
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'svelte-awesome'
  import { times } from 'svelte-awesome/icons'
  import { fade } from 'svelte/transition'

  export let top = 100
  export let left = 100
  export let hidden = false
  export let isLoading = false
  export let onClose = () => {}
  export let markerCoords = { x: 0, y: 0 }

  const dispatch = createEventDispatcher()
  let text = ''

  const onSubmit = () => {
    const data = {
      x: markerCoords.x,
      y: markerCoords.y,
      text,
    }
    dispatch('newObservation', data)
    text = ''
  }
  const handleKeydown = (e) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }
</script>

<svelte:window on:keydown="{handleKeydown}" />
{#if !hidden}
  <div style="--top:{top};--left:{left}" transition:fade>
    <span class="titleCont">
      <h6>Nueva observación</h6>
      <span on:click="{onClose}">
        <Icon data="{times}" scale="1.5" class="modalIcon" />
      </span>
    </span>
    <textarea rows="3" bind:value="{text}" disabled="{isLoading}"></textarea>
    <button on:click="{onSubmit}" class:disabled="{isLoading}">
      {isLoading ? 'REGISTRANDO...' : 'REGISTRAR'}
    </button>
  </div>
{/if}
