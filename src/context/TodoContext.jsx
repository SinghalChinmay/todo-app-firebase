import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateStatus,
  updateValue,
} from "../utils/firestore";

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);

  const [todos, setTodo] = useState([]);
  const [fetched, hasFetched] = useState(false);

  useEffect(() => {
    /*
     * Fetch data only for the initial render.
     * After that every operation will be done in the local state
     * The data will be updated on the database (but obviously will not be fetched from the db again)
     */
    if (!loading && !error && user && !fetched) {
      fetchTodos(user.uid).then((data) => {
        setTodo(data);
        hasFetched(true);
      });
    }

    // Execute fetchData when user is available and there are no errors
  }, [user, loading, error, todos, fetched]);

  const add = (value) => {
    const todoID = addTodo(value, user.uid);
    setTodo([
      ...todos,
      {
        value: value,
        isDone: false,
        key: todoID,
        user: user.uid,
      },
    ]);
  };

  const remove = (key) => {
    const updatedTodos = todos.filter((todo) => todo.key !== key);
    deleteTodo(key);
    setTodo(updatedTodos);
  };

  const update = (key, value = null) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        // Update the value if it is provided else update the todo completion status
        if (value) {
          updateValue(key, value);
          todo.value = value;
        } else {
          updateStatus(key, !todo.isDone);
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
        update: update,
        add: add,
        remove: remove,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
