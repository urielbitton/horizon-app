import { db } from '../firebase/fire'
import firebase from 'firebase'

export const setDB = (path, doc, value, merge=false) => {
  return db.collection(path).doc(doc).set(value, {merge})
}

export const updateDB = (path, doc, value) => {
  return db.collection(path).doc(doc).update(value)
}

export const deleteDB = (path, doc) => {
  return db.collection(path).doc(doc).delete()
}

export const addDB = (path, value) => {
  return db.collection(path).add(value)
}

export const getRandomDocID = (path) => {
  return db.collection(path).doc().id
}

export const getFireTimeStampFromDate = (date) => {
  return firebase.firestore.Timestamp.fromDate(date)
}