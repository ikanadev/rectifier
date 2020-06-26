import { writable } from 'svelte/store'

const createDocumentStore = () => {
  const { update, subscribe, set } = writable({})
  return {
    subscribe,
    setDocument: (doc) => {
      set(doc)
    },
    addObservation: (observation) => {
      update((data) => ({
        ...data,
        observations: [...data.observations, observation].sort((ob1, ob2) => ob1.y - ob2.y)
      }))
    },
    deleteObservation: (obsID) => {
      update((data) => ({
        ...data,
        observations: data.observations.filter((obs) => obs.id !== obsID)
      }))
    },
  }
}

const document = createDocumentStore()

export default document
