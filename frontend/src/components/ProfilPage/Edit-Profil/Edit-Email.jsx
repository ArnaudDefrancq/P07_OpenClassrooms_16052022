const EditEmail = ({ user }) => {
  return (
    <>
      <div>
        <div className="form--input--container">
          <p htmlFor="pseudo" className="form--label">
            Email
          </p>
          <p id="pseudo" className="form--input">
            {user.email}
          </p>
        </div>
      </div>
    </>
  );
};

export default EditEmail;
