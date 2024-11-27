import { db } from "../firebase"; // Ensure this is correctly imported
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

const collectionName = "users";

class FBDataService {
  addData = (newData) => {
    return addDoc(collection(db, collectionName), newData);
  };

  setData = (newData) => {
    return setDoc(doc(db, collectionName, newData.id), newData);
  };

  updateData = (id, newData) => {
    const docRef = doc(db, collectionName, id);
    return updateDoc(docRef, newData);
  };

  deleteData = (id) => {
    const docRef = doc(db, collectionName, id);
    return deleteDoc(docRef);
  };

  getAllData = async () => {
    const usersCollection = collection(db, collectionName);
    return await getDocs(usersCollection);
  };

  getData = (id) => {
    const docRef = doc(db, collectionName, id);
    return getDoc(docRef);
  };
}

// Assign the instance to a named variable before exporting
const fbDataService = new FBDataService();

export default fbDataService;
