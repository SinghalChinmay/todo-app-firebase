import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

export default function TodoEdit({ todoKey }) {
  const { update } = useTodoContext();
  const [updated, setUpdated] = useState("");

  return (
    <div className="todo-edit">
      <button
        className="fa fa-pencil btn btn-info btn-outline btn-sm"
        onClick={() => window.edit_modal.showModal()}
      ></button>
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box flex flex-col items-center justify-center"
        >
          <h3 className="text-center text-lg font-bold">Edit Todo</h3>
          <input
            type="text"
            name="edit-todo"
            id="edit"
            className="input input-primary m-2"
            value={updated}
            maxLength={35}
            onChange={(e) => {
              setUpdated(e.target.value);
            }}
          />
          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={() => update(todoKey, updated)}
            >
              Update
            </button>
            <button className="btn btn-error">Cancel</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
