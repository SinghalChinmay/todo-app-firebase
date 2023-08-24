import { useState } from "react";
import TodoEdit from "./TodoEdit";

export default function Todo({
  value,
  isDone,
  handleUpdate,
  handleDelete,
  todoKey,
}) {
  const [showBtns, setShowBtns] = useState(false);

  return (
    <div
      className="mt-3 todo-item flex p-3 gap-2 items-center"
      onMouseOver={() => setShowBtns(true)}
      onMouseOut={() => setShowBtns(false)}
    >
      <label className="cursor-pointer label flex gap-2">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => {
            handleUpdate(todoKey);
          }}
          name="todo"
          id="todo-item"
          className="checkbox checkbox-success"
        />
        <span
          className={"text-2xl label-text " + (isDone ? "line-through" : "")}
        >
          {value}
        </span>
      </label>
      {showBtns && (
        <div className="btns flex gap-2">
          <TodoEdit handleUpdate={handleUpdate} todoKey={todoKey} />
          <button
            className="btn btn-outline btn-error btn-sm"
            onClick={() => handleDelete(todoKey)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
}
