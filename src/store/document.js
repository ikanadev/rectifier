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
        observations: [...data.observations, observation]
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
