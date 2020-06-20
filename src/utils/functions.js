import api from '../api/api'
import user from '../store/user'
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
      .then((resp) => {
        user.setUser(resp.user)
        localStorage.setItem(LS_TOKEN, `Bearer ${resp.token}`)
        resolve(true)
      })
      .catch(() => {
        localStorage.removeItem(LS_TOKEN)
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
