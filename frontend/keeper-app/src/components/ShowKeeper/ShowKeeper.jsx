import React, { useState } from "react";
import "./ShowKeeper.css";
import axios from "axios";

export const ShowKeeper = ({ keeperList, setKeeperList }) => {
  const [editingNote, setEditingNote] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState("");

  function handleDeleteBtn(id) {
    axios
      .post("http://localhost:3001/api/delete", { id })
      .then((res) => setKeeperList(res.data))
      .catch((err) => console.log("Delete Api error", err));
  }

  function handleEditBtn(id, description) {
    setEditingNote(id);
    setUpdatedDescription(description);
  }

  function handleUpdateBtn(id) {
    const updatedData = {
      description: updatedDescription,
    };

    axios
      .post("http://localhost:3001/api/update", { id, updatedData })
      .then((res) => {
        setKeeperList(res.data);
        setEditingNote(null);
      })
      .catch((err) => console.log("Error Updating Data: ", err));
  }

  return (
    <div className="ShowKeeper row">
      {keeperList.map((keeper) => {
        return (
          <div className="KeeperCard col-md-3" key={keeper._id}>
            <h1 className="title">
              {keeper.title}
              <i
                className="updateIcon fa-regular fa-pen-to-square"
                onClick={() => handleEditBtn(keeper._id, keeper.description)}
              ></i>
              <i
                className="deleteIcon fa fa-trash"
                onClick={() => handleDeleteBtn(keeper._id)}
              ></i>
            </h1>
            {editingNote === keeper._id ? (
              <div>
                <textarea
                  className="descriptionBox"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <button
                  className="saveBtn"
                  onClick={() => handleUpdateBtn(keeper._id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <textarea
                className="descriptionBox"
                name="description"
                value={keeper.description}
                readOnly
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
