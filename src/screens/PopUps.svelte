<script>
  import popUps from '../store/popups'
  import Popup from '../components/Popup.svelte'
</script>

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

<div class="cont">
  {#each $popUps as popUp (popUp.id)}
    <Popup item={popUp} />
  {/each}
</div>