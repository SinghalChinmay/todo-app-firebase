import { useState } from "react";
import TodoEdit from "./TodoEdit";
import { useTodoContext } from "../context/TodoContext";

export default function Todo({ value, isDone, id }) {
  const { update, remove } = useTodoContext();
  const [showBtns, setShowBtns] = useState(false);

  return (
    <div
      className={
        "todo-item m-2 flex min-w-[320px] max-w-[320px] items-center p-3 " +
        (value.trim().split(" ").length == 1 ? "break-all" : "break-words")
      }
      onMouseOver={() => setShowBtns(true)}
      onMouseOut={() => setShowBtns(false)}
    >
      <label className="label flex cursor-pointer gap-2">
        <input
          type="checkbox"
          checked={isDone}
          onChange={() => {
            if (showBtns) {
              update(id);
            }
          }}
          name="todo"
          id="todo-item"
          className="checkbox-success checkbox"
        />
        <span
          className={"label-text text-2xl " + (isDone ? "line-through" : "")}
        >
          {value}
        </span>
      </label>

      {showBtns && (
        <div className="btns flex gap-2">
          <TodoEdit todoKey={id} />
          <button
            className="btn btn-error btn-outline btn-sm"
            onClick={() => remove(id)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
}
