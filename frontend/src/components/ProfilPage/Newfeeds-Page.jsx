import React from "react";

const NewfeedsPage = () => {
  const handleClick = () => {
    window.location = "/trending";
  };
  return (
    <>
      <button className="btn-profil" onClick={handleClick}>
        Accueil
      </button>
    </>
  );
};

export default NewfeedsPage;
