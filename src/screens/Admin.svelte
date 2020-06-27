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

  import api from '../api/api'
  import { LS_TOKEN } from '../utils/consts'
  import user from '../store/user'
  import userData from '../store/userData'
  import selected from '../store/selected'
  import document from '../store/document'
  import popUps from '../store/popups'
  import Header from '../components/Header.svelte'
  import Projects from './Admin/Projects.svelte'
  import Documents from './Admin/Documents.svelte'
  import Document from './Document.svelte'

  let marginTop = 0

  const onLoadHeader = (event) => {
    marginTop = event.detail
  }
  const onLogout = () => {
    user.setUser({})
    document.setDocument({})
    selected.clearData()
    userData.clearData()
    localStorage.removeItem(LS_TOKEN)
  }
  onMount(() => {
    api.user
      .projectList()
      .then((res) => {
        userData.setProjects(res.projects)
      })
      .catch((err) => {
        if (!err || !err.data) {
          popUps.addErrorPopUp('Hubo un error con el servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  })
</script>

<Header
  name="{$user.name}"
  actionText="Salir"
  on:load="{onLoadHeader}"
  on:action="{onLogout}"
/>
<main style="--marginTop:{marginTop}px">
  {#if Object.keys($document).length !== 0}
    <Document editable={false} />
  {:else if $selected.project !== 0}
    <Documents />
  {:else}
    <Projects projects="{$userData.projects}" />
  {/if}
</main>
