import { createContext, useContext, useState, useEffect } from "react";
import {
  query,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const collectionRef = collection(db, "todos");
  const [todos, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && !error && user) {
        const q = query(collection(db, "todos"), where("user", "==", user.uid));
        try {
          const snapshot = await getDocs(q);
          const todosData = snapshot.docs.map((doc) => ({
            key: doc.id,
            ...doc.data(),
          }));
          setTodo(todosData);
        } catch (fetchError) {
          console.error("Error fetching todos:", fetchError);
        }
      }
    };

    // Execute fetchData when user is available and there are no errors
    fetchData();
  }, [user, loading, error]);

  const addTodo = (value) => {
    const todoRef = doc(collectionRef);
    setDoc(todoRef, {
      user: user.uid,
      value: value,
      isDone: false,
    }).then(console.log("Added todo"));
    setTodo([
      ...todos,
      {
        value: value,
        isDone: false,
        key: todoRef.id,
        user: user.uid,
      },
    ]);
  };

  const deleteTodo = (key) => {
    const updatedTodos = todos.filter((todo) => todo.key !== key);
    deleteDoc(doc(db, "todos", key)).then(console.log("Deleted todo"));
    setTodo(updatedTodos);
  };

  const updateTodo = (key, value = null) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        // Update the value if it is provided else update the todo completion status
        if (value) {
          updateDoc(doc(db, "todos", key), {
            value: value,
          }).then(console.log("Updated todo value"));
          todo.value = value;
        } else {
          updateDoc(doc(db, "todos", key), {
            isDone: !todo.isDone,
          }).then(console.log("Updated todo status"));
          todo.isDone = !todo.isDone;
        }
      }
      return todo;
    });
    setTodo(updatedTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        update: updateTodo,
        add: addTodo,
        remove: deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
