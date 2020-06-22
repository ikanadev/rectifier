<script>
  import { onMount } from 'svelte'

  import userData from '../store/userData'
  import api from '../api/api'
  import { LS_TOKEN } from '../utils/consts'
  import user from '../store/user'
  import Header from '../components/Header.svelte'
  import Projects from './Admin/Projects.svelte'

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
      .catch((err) => {
        
      })
  })
</script>
<style>
  main {
    margin-top: var(--marginTop);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  h2 {
    margin-top: 20px;
    margin-bottom: 15px;
    text-align: center;
    color: var(--primary);
  }
</style>

<Header name={$user.name} actionText="Salir" on:load={onLoadHeader} on:action={onLogout} />
<main style="--marginTop:{marginTop}px">
  <h2>Mis Proyectos</h2>
  <Projects projects={$userData.projects} />
</main>
