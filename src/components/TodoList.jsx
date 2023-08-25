import { useState } from "react";
import Todo from "./TodoItem";

export default function TodoList({ data, handleUpdate, handleDelete }) {
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredData = showCompleted
    ? data
    : data.filter((todo) => todo.isDone == false);

  return (
    <div className="todo-list">
      <div className="flex justify-center p-3 filter">
        <label className="label flex cursor-pointer gap-2">
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

      <div className="todos flex flex-col items-center">
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
    </div>
  );
}
