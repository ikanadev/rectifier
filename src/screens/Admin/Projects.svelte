<script>
  import { createEventDispatcher } from 'svelte'
  import Icon from 'svelte-awesome'
  import { times } from 'svelte-awesome/icons'
  export let projects = [{
    id: 1,
    created_at: "2020-06-19T15:45:25.67903Z",
    updated_at: "2020-06-19T15:45:25.67903Z",
    deleted_at: "0001-01-01T00:00:00Z",
    name: "project 1",
    institute: "Some institute",
  }]
  const dispatch = createEventDispatcher()
</script>

{#each projects as project}
  <article>
    <div>
      <h3>{project.id}</h3>
      <span>
        <Icon data="{times}" scale="1.5" class="modalIcon" />
      </span>
    </div>
    <hr>
    <p>
      Creado el: {project.created_at}
    </p>
  </article>
{/each}

