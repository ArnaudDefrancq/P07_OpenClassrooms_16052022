import React from "react";

const EditEmail = ({ user }) => {
  return (
    <div>
      <div className="form--input--container">
        <label htmlFor="email" className="form--label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form--input"
          defaultValue={user}
        />
      </div>
    </div>
  );
};

export default EditEmail;
