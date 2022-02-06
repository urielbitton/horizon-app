import { db } from "../firebase/fire"

export const getUserByID = (userID, setUser) => {
  db.collection('users')
  .doc(userID)
  .onSnapshot(snap => {
    setUser(snap.data())
  })
}