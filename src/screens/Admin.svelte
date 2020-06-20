<script>
  import { onMount } from 'svelte'
  import { LS_TOKEN } from '../utils/consts'
  import Header from '../components/Header.svelte'
  import user from '../store/user'

  let marginTop = 0
  const onLoadHeader = (event) => {
    marginTop = event.detail
  }
  const onLogout = () => {
    user.setUser({})
    localStorage.removeItem(LS_TOKEN)
  }
  onMount(() => {
    console.log();
  })
</script>
<style>
  main {
    margin-top: var(--marginTop);
    display: flex;
    justify-content: center;
  }
</style>

<Header name={$user.name} actionText="Salir" on:load={onLoadHeader} on:action={onLogout} />
<main style="--marginTop:{marginTop}px">
  {Object.keys($user)}
</main>
