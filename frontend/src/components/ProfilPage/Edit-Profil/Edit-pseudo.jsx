import React from "react";

const EditPseudo = ({ user }) => {
  return (
    <div>
      <div className="form--input--container">
        <label htmlFor="pseudo" className="form--label">
          Pseudo
        </label>
        <input
          type="text"
          id="pseudo"
          className="form--input"
          defaultValue={user}
        />
      </div>
    </div>
  );
};

export default EditPseudo;
