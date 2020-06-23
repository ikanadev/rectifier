<style>
  .cont {
    position: fixed;
    top: 15px;
    right: 15px;
    display: flex;
    flex-direction: column;
    z-index: 100;
  }
</style>

<script>
  import popUps from '../store/popups'
  import Popup from '../components/Popup.svelte'
</script>

<div class="cont">
  {#each $popUps as popUp (popUp.id)}
    <Popup item="{popUp}" />
  {/each}
</div>
