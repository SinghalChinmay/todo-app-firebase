import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
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

      {
        <div className="todo-wrapper mt-2 flex flex-col items-center justify-center gap-3 p-3">
          <div className="todos max-w-full items-center rounded-xl border-2 border-solid border-red-100 bg-gray-800 p-3">
            {filteredData.length != 0 ? (
              filteredData.map((todo) => {
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
              })
            ) : (
              <p className="min-w-[320px] max-w-[320px] p-3 text-center text-xl text-gray-400">
                You&apos;re all caught up! 💐
              </p>
            )}
          </div>
          <div
            className="btn btn-error btn-sm"
            onClick={() => signOut(auth).catch((err) => console.log(err))}
          >
            Sign Out
          </div>
        </div>
      }
    </div>
  );
}
