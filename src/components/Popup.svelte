<style>
  .cont {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    z-index: 25;
    background-color: white;
    width: 350px;
    padding: 8px 15px;
    border-radius: 8px;
    border: 1.5px solid var(--color);
    box-shadow: 3px 3px 7px 2px #686868;
  }
  .message {
    flex: 1;
    padding-left: 12px;
    padding-right: 12px;
  }
  .icon {
    color: var(--color);
  }
  .closeCont {
    cursor: pointer;
    border-radius: 50%;
    padding: 5px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .closeCont:hover {
    background: #bbb;
  }
</style>

<script>
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import Icon from 'svelte-awesome'
  import {
    times,
    check,
    exclamation,
    exclamationTriangle,
  } from 'svelte-awesome/icons'

  import popUps from '../store/popups'

  export let item = { id: '', message: '', type: 'warning' }

  $: color = () => {
    if (item.type === 'error') {
      return '#F94647'
    }
    return item.type === 'success' ? '#71C441' : '#FCB200'
  }

  const close = () => {
    popUps.removePopUp(item.id)
  }

  onMount(() => {
    setTimeout(() => {
      close()
    }, 4500)
  })
</script>

<div class="cont" transition:slide style="--color:{color()}">
  <span class="icon">
    <Icon
      scale="2"
      data="{item.type === 'success' ? check : item.type === 'warning' ? exclamation : exclamationTriangle}"
    />
  </span>
  <div class="message">
    <p>{item.message}</p>
  </div>
  <span class="closeCont" on:click="{close}">
    <Icon data="{times}" />
  </span>
</div>
