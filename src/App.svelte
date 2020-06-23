<style>
  div {
    margin-top: 75px;
  }
</style>

<script>
  import { isLogged } from './store/user'
  import Admin from './screens/Admin.svelte'
  import Home from './screens/Home.svelte'
  import PopUps from './screens/PopUps.svelte'
  import { checkLogin } from './utils/functions'
  const promise = checkLogin()
</script>

<PopUps />
{#await promise}
  <h1>LOADING</h1>
{:then res}
  {#if res || $isLogged}
    <Admin />
  {:else}
    <Home />
  {/if}
{/await}
