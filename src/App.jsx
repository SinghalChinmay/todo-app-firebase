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

  const handleUpdateTodo = (key) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.key === key) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodo(updatedTodos);
  };

  return (
    <div className="App">
      <div className="add-todo flex p-3 gap-3">
        <input
          type="text"
          name="new-todo"
          id="ntodo"
          className="input input-bordered input-secondary"
          placeholder="Add a new task"
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onKeyUp={handleAddTodo}
        />
        <button className="btn btn-secondary">Add Todo</button>
      </div>
      <TodoList data={todos} handleUpdate={handleUpdateTodo} />
    </div>
  );
}

export default App;
