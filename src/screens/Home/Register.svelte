<style>
  .formCont {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  input {
    border: none;
    border-bottom: 0.8px solid #888;
    padding: 8px;
    padding-bottom: 2px;
    font-weight: 300;
    font-size: 20px;
    min-width: 220px;
    margin-bottom: 12px;
  }
  input:focus {
    outline: none;
  }
  button {
    border-radius: 6px;
    border: none;
    height: 35px;
    color: white;
    background: #f83e06;
    margin-top: 15px;
    font-weight: 300;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 15px;
  }
  button:hover {
    background: #fa4e16;
  }
  .loading,
  .loading:hover {
    background: var(--disabled);
  }
</style>

<script>
  import { fade } from 'svelte/transition'

  import { LS_TOKEN } from '../../utils/consts'
  import api from '../../api/api'
  import popUps from '../../store/popups'
  import user from '../../store/user'

  let name = ''
  let lastName = ''
  let password = ''
  let email = ''
  let loading = false

  const handleRegister = () => {
    if (
      name.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      popUps.addWarningPopUp('Complete todos los campos')
      return
    }
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      popUps.addWarningPopUp('Ingrese un email válido')
      return
    }
    loading = true
    api.user
      .register(name, lastName, password, email)
      .then((res) => {
        console.log(res)
        loading = false
        localStorage.setItem(LS_TOKEN, `Bearer ${res.token}`)
        user.setUser(res.user)
        popUps.addSuccessPopUp(`Bienvenido a rectify ${res.user.name}!`)
      })
      .catch((err) => {
        loading = false
        if (!err || !err.data) {
          popUps.addErrorPopUp('Hubo un error con el servidor')
          return
        }
        popUps.addWarningPopUp(err.data.message)
      })
  }
</script>

<form class="formCont" in:fade>
  <input bind:value="{name}" type="text" placeholder="Nombre(s)" />
  <input bind:value="{lastName}" type="text" placeholder="Apellido(s)" />
  <input bind:value="{email}" type="text" placeholder="Correo electrónico" />
  <input bind:value="{password}" type="password" placeholder="Password" />
  <button
    on:click|preventDefault="{handleRegister}"
    disabled="{loading}"
    class:loading
  >
    REGISTRARME
  </button>
</form>
