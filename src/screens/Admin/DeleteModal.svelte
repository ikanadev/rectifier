<style>
  h3 {
    font-size: 22px;
    color: var(--text);
    text-align: center;
    font-weight: bold;
  }
  div {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }
</style>

<script>
  import { createEventDispatcher } from 'svelte'
  import Button from '../../components/Button.svelte'
  import Modal from '../../components/Modal.svelte'

  export let open = false
  export let loading = false
  export let message = ''

  const dispatch = createEventDispatcher()

  const onClose = () => {
    dispatch('close')
  }
  const onDelete = () => {
    dispatch('delete')
  }
</script>

<Modal {open}>
  <h3>{message}</h3>
  <div>
    <Button text="BORRAR" red disabled="{loading}" on:action="{onDelete}" />
    <Button text="CANCELAR" disabled="{loading}" on:action="{onClose}" />
  </div>
</Modal>
