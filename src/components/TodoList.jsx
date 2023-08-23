import { useState } from "react";
import Todo from "./TodoItem";

export default function TodoList({ data, handleUpdate }) {
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredData = showCompleted
    ? data
    : data.filter((todo) => todo.isDone == false);

  return (
    <div className="todo-list">
      <div className="filter p-3 flex items-center gap-2">
        <input
          type="checkbox"
          name="todo-filter"
          id="filter-todo"
          className="checkbox checkbox-accent"
          checked={showCompleted}
          onChange={() => setShowCompleted(!showCompleted)}
        />
        <label className="label-text" htmlFor="todo-filter">
          Show Completed Tasks
        </label>
      </div>
      {filteredData.map((todo) => {
        return (
          <Todo
            value={todo.value}
            isDone={todo.isDone}
            key={todo.key}
            todoKey={todo.key}
            handleUpdate={handleUpdate}
          />
        );
      })}
    </div>
  );
}
