import { useState } from "react";

export default function Todo({ value, isDone, handleUpdate, todoKey }) {
  const [showBtns, setShowBtns] = useState(false);

  return (
    <div
      className="mt-3 todo1 flex p-3 gap-2 items-center"
      onMouseOver={() => setShowBtns(true)}
      onMouseOut={() => setShowBtns(false)}
    >
      <input
        type="checkbox"
        checked={isDone}
        onChange={() => {
          handleUpdate(todoKey);
        }}
        name="todo"
        id="todo-item"
        className="checkbox"
      />
      <label
        htmlFor="todo"
        className={"text-2xl label-text " + (isDone ? "line-through" : "")}
      >
        <span>{value}</span>
      </label>

      {
        // TODO: Implement editing and deleting
        showBtns && (
          <div className="btns flex gap-2">
            <button className="btn btn-outline btn-info btn-sm">
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-outline btn-error btn-sm">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        )
      }
    </div>
  );
}
