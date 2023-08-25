import { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    if ((e.type === "keyup" && e.key === "Enter") || e.type === "click") {
      if (newTodo !== "") {
        setTodo([
          ...todos,
          { value: newTodo, isDone: false, key: todos.length + 1 },
        ]); // TODO: Don't use the length of the array for key
        setNewTodo("");
      }
    }
  };

  const handleUpdateTodo = (key, value = null) => {
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

  const handleDeleteTodo = (key) => {
    const updatedTodos = todos.filter((todo) => todo.key !== key);
    setTodo(updatedTodos);
  };

  return (
    <div className="App">
      <h1 className="font-bol p-3 text-center text-3xl">Todo App</h1>
      <div className="add-todo flex flex-wrap items-center justify-center gap-3 p-3">
        <input
          type="text"
          name="new-todo"
          id="ntodo"
          className="input input-bordered input-secondary"
          placeholder="Add a new task"
          value={newTodo}
          maxLength={35}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onKeyUp={handleAddTodo}
        />

        <button className="btn btn-secondary" onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <TodoList
        data={todos}
        handleUpdate={handleUpdateTodo}
        handleDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
