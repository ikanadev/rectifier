<script>
  import Icon from 'svelte-awesome'
  import { plus } from 'svelte-awesome/icons'
  import { createEventDispatcher } from 'svelte'

  export let red = false
  export let blue = false
  export let primary = false
  export let disabled = false
  export let type = 'button'

  const dispatch = createEventDispatcher()
  const onClick = () => {
    dispatch('action')
  }
</script>

<style>
  button {
    border: none;
    height: 56px;
    width: 56px;
    border-radius: 50%;
    color: white;
    box-shadow: 6px 6px 12px var(--dark), -6px -6px 12px white;
    transition: all 0.5s;
    background-color: var(--dark);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button:hover {
    box-shadow: 10px 10px 20px var(--dark), -10px -10px 20px white;
  }
  .red {
    background-color: var(--red);
  }
  .blue {
    background-color: var(--blue);
  }
  .primary {
    background-color: var(--primary);
  }
  .disabled {
    background-color: var(--disabled);
    box-shadow: none;
  }
  .disabled:hover {
    box-shadow: none;
  }
</style>

<button type={type} class:red class:blue class:primary class:disabled on:click|preventDefault={onClick} disabled={disabled}>
  <Icon data="{plus}" scale="2" />
</button>