import { db } from "../firebase/fire"

export const getUserByID = (userID, setUser) => {
  db.collection('users')
  .doc(userID)
  .onSnapshot(snap => {
    setUser(snap.data())
  })
}

export const getContactsByUserID = (userID, setContacts, limit) => {
  db.collection('users')
  .doc(userID)
  .collection('contacts')
  .limit(limit)
  .onSnapshot(snap => {
    const contactsArr = []
    snap.forEach(doc => contactsArr.push(doc.data()))
    setContacts(contactsArr)
  })
}