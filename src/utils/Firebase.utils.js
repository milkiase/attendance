// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection, addDoc, setDoc, doc, getDocs, query, orderBy} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYA3-7g3MCxGUMAAgy9KK49bO7avKRuTo",
  authDomain: "attendance-3c330.firebaseapp.com",
  projectId: "attendance-3c330",
  storageBucket: "attendance-3c330.appspot.com",
  messagingSenderId: "341490399261",
  appId: "1:341490399261:web:243e6d7874f568e0176ef4",
  measurementId: "G-RK62HVY7RS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const studentsCollection = collection(db, 'students')

export const createStudents = async (students)=>{
  try {
    students.forEach(async(student)=>{
      const response = await addDoc(studentsCollection, student)
    })
  } catch (error) {
  }
}

export const fetchStudents = async()=>{
  const q = query(studentsCollection, orderBy('name'))
  const students = []
  
  try {
    // const querySnapshot = await studentsCollection
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc)=>{
      students.push({...doc.data(), firebaseId: doc.id})
    })
  } catch (error) {
  }
  return students
}

export const updateStudent = async(newStudent)=>{
  try {
    // console.log('updating student to firebase')
    await setDoc(doc(db, 'students', newStudent.firebaseId), newStudent)
    return
  } catch (error) {
    throw Error
  }
}

export const createStudent = async(newStudent)=>{
  try {
    const response = await addDoc(studentsCollection, {...newStudent, attendance: []})
    return response.id
  } catch (error) {
    throw error
  }
}