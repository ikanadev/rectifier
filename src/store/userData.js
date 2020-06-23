import { writable, derived } from 'svelte/store'

import { normalize } from '../utils/functions'

const intialState = {
  projects: {},
  documents: {},
  observations: {},
}

const createUserDataStore = () => {
  const { set, update, subscribe } = writable(intialState)
  return {
    subscribe,
    clearData: () => set(intialState),
    setProjects: (projects) => {
      const projectsWithDocs = projects.map((project) => ({
        ...project,
        documents: [],
      }))
      update((data) => ({ ...data, projects: normalize(projectsWithDocs) }))
    },

    addProject: (project) => {
      update((data) => ({
        ...data,
        projects: {
          ...data.projects,
          [project.id]: { ...project, documents: [] },
        },
      }))
    },

    deleteProject: (projectID) => {
      update((data) => {
        const newProjects = data.projects
        delete newProjects[projectID]
        return { ...data, projects: newProjects }
      })
    },

    setDocuments: (projectID, documents) => {
      const documentIDs = documents.map((doc) => doc.id)
      const documentsWithObs = documents.map((doc) => ({
        ...doc,
        observations: [],
      }))
      update((data) => {
        const newProjects = {
          ...data.projects,
          [projectID]: { ...data.projects[projectID], documents: documentIDs },
        }
        return {
          ...data,
          documents: { ...data.documents, ...normalize(documentsWithObs) },
          projects: newProjects,
        }
      })
    },

    addDocument: (projectID, document) => {
      update((data) => {
        const updatedProjects = {
          ...data.projects,
          [projectID]: {
            ...data.projects[projectID],
            documents: [...data.projects[projectID].documents, document.id],
          },
        }
        return {
          ...data,
          documents: {
            ...data.documents,
            [document.id]: { ...document, observations: [] },
          },
          projects: updatedProjects,
        }
      })
    },

    updateDocument: (document) => {
      update((data) => ({
        ...data,
        documents: {
          ...data.documents,
          [document.id]: {
            ...document,
            observations: data.documents[document.id].observations,
          },
        },
      }))
    },

    deleteDocument: (documentID, projectID) => {
      update((data) => {
        const newProjects = {
          ...data.projects,
          [projectID]: {
            ...data.projects[projectID],
            documents: data.projects[projectID].documents.filter(
              (docID) => docID !== projectID
            ),
          },
        }
        const newDocuments = data.documents
        delete newDocuments[documentID]
        return {
          ...data,
          projects: newProjects,
          documents: newDocuments,
        }
      })
    },

    setObservations: (documentID, observations) => {
      const obsIds = observations.map((obs) => obs.id)
      update((data) => {
        const newDocuments = {
          ...data.documents,
          [documentID]: { ...data.documents[documentID], observations: obsIds },
        }
        return {
          ...data,
          documents: newDocuments,
          observations: { ...data.observations, ...normalize(observations) },
        }
      })
    },
  }
}

const userData = createUserDataStore()

export const getDocuments = (projectID) =>
  derived(userData, ($userData) => {
    const project = $userData.projects[projectID]
    if (!project) return {}
    const documents = $userData.documents
    return project.documents.reduce((prev, docID) => {
      if (documents[docID]) {
        prev[docID] = documents[docID]
      }
      return prev
    }, {})
  })

export default userData
