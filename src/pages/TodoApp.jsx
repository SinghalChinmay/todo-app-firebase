import { useState } from "react";
import TodoList from "../components/TodoList";
import { useTodoContext } from "../context/TodoContext";

function TodoApp() {
  const { add } = useTodoContext();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (e) => {
    if ((e.type === "keyup" && e.key === "Enter") || e.type === "click") {
      if (newTodo !== "") {
        add(newTodo);
        setNewTodo("");
      }
    }
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
      <TodoList />
    </div>
  );
}

export default TodoApp;
