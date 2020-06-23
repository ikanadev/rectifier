<style>
  div {
    margin-top: 75px;
  }
</style>

<script>
  import { isLogged } from './store/user'
  import document from './store/document'
  import Admin from './screens/Admin.svelte'
  import Home from './screens/Home.svelte'
  import Document from './screens/Document.svelte'
  import PopUps from './screens/PopUps.svelte'
  import { checkLogin } from './utils/functions'
  const promise = checkLogin()
</script>

<PopUps />
{#await promise}
  <h1>LOADING</h1>
{:then}
  {#if $isLogged}
    <Admin />
  {:else}
    {#if Object.keys($document).length > 0}
      <Document />
    {:else}
      <Home />
    {/if}
  {/if}
{/await}
