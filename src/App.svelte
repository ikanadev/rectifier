<style>
  div {
    margin-top: 75px;
  }
</style>

<script>
  import { isLogged } from './store/user'
  import Header from './components/Header.svelte'
  import Rectifier from './screens/Rectifier.svelte'
  import Home from './screens/Home.svelte'
  import PopUps from './screens/PopUps.svelte'  
</script>

<PopUps />
{#if !$isLogged}
  <Home />
{:else}
  <Header />
  <div>
    <Rectifier />
  </div>
{/if}
