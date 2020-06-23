<style>
  main {
    margin-top: var(--marginTop);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>

<script>
  import { onMount } from 'svelte'

  import userData from '../store/userData'
  import api from '../api/api'
  import { LS_TOKEN } from '../utils/consts'
  import user from '../store/user'
  import selected from '../store/selected'
  import Header from '../components/Header.svelte'
  import Projects from './Admin/Projects.svelte'
  import Documents from './Admin/Documents.svelte'

  let marginTop = 0

  const onLoadHeader = (event) => {
    marginTop = event.detail
  }
  const onLogout = () => {
    user.setUser({})
    localStorage.removeItem(LS_TOKEN)
  }
  onMount(() => {
    api.user
      .projectList()
      .then((res) => {
        userData.setProjects(res.projects)
        console.log(res)
      })
      .catch((err) => {})
  })
</script>

<Header
  name="{$user.name}"
  actionText="Salir"
  on:load="{onLoadHeader}"
  on:action="{onLogout}"
/>
<main style="--marginTop:{marginTop}px">
  {#if $selected.document !== 0}
    <p>render pdf view</p>
  {:else if $selected.project !== 0}
    <Documents />
  {:else}
    <Projects projects="{$userData.projects}" />
  {/if}
</main>
