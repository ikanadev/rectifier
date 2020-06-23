import { writable, derived } from 'svelte/store'

const createUserStore = () => {
  const { set, subscribe } = writable({})

  return {
    subscribe,
    setUser: (user) => set(user),
  }
}

const user = createUserStore()

export const isLogged = derived(user, ($user) => Object.keys($user).length > 0)
// export const isLogged = (str) => derived(user, $user => str + (Object.keys($user).length > 0))
//const hello1 = isLogged('foo')
export default user
