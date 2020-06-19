import api from '../api/api'
import { LS_TOKEN } from './consts'

export const getToken = () => {
  return localStorage.getItem(LS_TOKEN)
}

export const checkLogin = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem(LS_TOKEN)
    if (token === null) {
      resolve(false)
    }
    api.user
      .checkToken()
      .then((user) => {
        console.log('USER', user)
        resolve(true)
      })
      .catch(() => {
        resolve(false)    
      })
  })
}

export const normalize = (objects) => {
  return objects.reduce((prev, current) => {
    prev[current.id] = current;
    return prev;
  }, {});
};
