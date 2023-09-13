import { db } from "./firebaseConfig"
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
} from "firebase/firestore"

const collectionRef = collection(db, "todos")

const fetchTodos = async (user) => {
    const q = query(
        collection(db, "todos"),
        where("user", "==", user),
    );
    try {
        const snapshot = await getDocs(q);
        const todosData = snapshot.docs.map((doc) => ({
            key: doc.id,
            ...doc.data(),
        }));
        return todosData
    } catch (err) {
        console.error("Error fetching todos:", err);
    }
}

const addTodo = (value, user) => {
    const todoRef = doc(collectionRef)
    setDoc(todoRef, {
        user: user,
        value: value,
        isDone: false,
    })
    return todoRef.id
}

const deleteTodo = (key) => {
    deleteDoc(doc(db, "todos", key))
}

const updateStatus = (key, status) => {
    updateDoc(doc(db, "todos", key), {
        isDone: status,
    });
}

const updateValue = (key, value) => {
    updateDoc(doc(db, "todos", key), {
        value: value,
    })
}

export { fetchTodos, addTodo, deleteTodo, updateValue, updateStatus }
