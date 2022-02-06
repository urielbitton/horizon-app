import { db } from '../firebase/fire'

export const setDB = (path, value, merge=false) => {
  return db.collection(path).set(value, {merge})
}

export const updateDB = (path, value) => {
  return db.collection(path).update(value)
}

export const deleteDB = (path) => {
  return db.collection(path).delete()
}

export const addDB = (path, value) => {
  return db.collection(path).add(value)
}