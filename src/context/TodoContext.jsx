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
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const collectionRef = collection(db, "todos");
  const [todos, setTodo] = useState([]);
  const [fetched, hasFetched] = useState(false);

  useEffect(() => {
    /*
     * Fetch data only for the initial render.
     * After that every operation will be done in the local state
     * The data will be updated on the database (but obviously will not be fetched from the db again)
     */
    const fetchData = async () => {
      if (!loading && !error && user && !fetched) {
        const q = query(
          collection(db, "todos"),
          where("user", "==", user.uid),
          orderBy("user", "desc"),
        );
        try {
          const snapshot = await getDocs(q);
          const todosData = snapshot.docs.map((doc) => ({
            key: doc.id,
            ...doc.data(),
          }));
          setTodo(todosData);
          hasFetched(true);
        } catch (fetchError) {
          console.error("Error fetching todos:", fetchError);
        }
      }
    };

    // Execute fetchData when user is available and there are no errors
    fetchData();
  }, [user, loading, error, todos, fetched]);

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
          });
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
