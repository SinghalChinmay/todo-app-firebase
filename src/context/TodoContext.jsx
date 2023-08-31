import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const useTodoContext = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todos, setTodo] = useState([]);

  const addTodo = (value) => {
    // ! Don't use the length of the array for key
    setTodo([...todos, { value: value, isDone: false, key: todos.length + 1 }]);
  };

  const deleteTodo = (key) => {
    const updatedTodos = todos.filter((todo) => todo.key !== key);
    setTodo(updatedTodos);
  };

  const updateTodo = (key, value = null) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        // Update the value if it is provided else update the todo completion status
        if (value) {
          todo.value = value;
        } else {
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
