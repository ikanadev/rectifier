<style>
  .cont {
    position: fixed;
    bottom: 8px;
    width: 382px;
    height: calc(100% - 88px);
    padding: 8px;
    display: flex;
    flex-direction: column;
  }
  .observation {
    border-radius: 6px;
    background: white;
    width: 100%;
    flex: 1;
    box-shadow: 2px 2px 4px 1px #44444466;
    padding: 8px;
    box-sizing: border-box;
    overflow-y: scroll;
  }
  .showObs {
    font-weight: bold;
    letter-spacing: 0.2em;
    border-radius: 6px;
    border: none; 
    height: 35px;
    color: white;
    background: #f83e06;
    margin-top: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  .showObs:hover {
    background: #fa4e16;
  }
  h6 {
    color: #fa4e16;
    font-size: 1.2em;
    letter-spacing: 0.1em;
    font-style: italic;
    text-decoration: underline;
    text-align: right;
  }
  .noObsCont {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #646464;
    font-size: 15px;
    font-style: italic;
  }
</style>

<script>
  import Icon from 'svelte-awesome'
  import { check } from 'svelte-awesome/icons'

  import ObsItem from './ObsItem.svelte'

  export let observations = [];
  
</script>

<div class="cont">
  <div class="observation">
    <h6>Observaciones:</h6>
    {#if observations.length === 0}
      <span class="noObsCont">
        <span>
          <Icon data={check} scale="3" class="modalIcon" />
        </span>
        <p>
          No hay observaciones por el momento
        </p>
      </span>
    {:else}
      {#each observations as observation}
        <ObsItem {observation} />
      {/each}
    {/if}
  </div>
  <button class="showObs">ABRIR COMO PDF</button>
</div>
