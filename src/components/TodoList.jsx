import { useState } from "react";
import Todo from "./TodoItem";

export default function TodoList({ data, handleUpdate, handleDelete }) {
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredData = showCompleted
    ? data
    : data.filter((todo) => todo.isDone == false);

  return (
    <div className="todo-list">
      <div className="filter p-3 flex">
        <label className="cursor-pointer label flex gap-2">
          <input
            type="checkbox"
            name="todo-filter"
            id="filter-todo"
            className="checkbox checkbox-sm"
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          <span className="label-text">Show Completed Tasks</span>
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
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
}
