import { useState } from "react";

export default function TodoEdit({ handleUpdate, todoKey }) {
  const [updated, setUpdated] = useState("");

  return (
    <div className="todo-edit">
      <button
        className="btn btn-outline btn-info btn-sm fa fa-pencil"
        onClick={() => window.edit_modal.showModal()}
      ></button>
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box flex flex-col justify-center items-center"
        >
          <h3 className="font-bold text-lg text-center">Edit Todo</h3>
          <input
            type="text"
            name="edit-todo"
            id="edit"
            className="input input-primary m-2"
            value={updated}
            onChange={(e) => {
              setUpdated(e.target.value);
            }}
          />
          <div className="modal-action">
            <button
              className="btn btn-success"
              onClick={() => handleUpdate(todoKey, updated)}
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
