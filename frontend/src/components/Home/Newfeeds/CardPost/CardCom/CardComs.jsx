import React from "react";
import Com from "./Com";

const CardComs = ({ post, userAdmin }) => {
  return (
    <>
      {post.Comments.map((com) => {
        return <Com post={post} com={com} userAdmin={userAdmin} key={com.id} />;
      })}
    </>
  );
};

export default CardComs;
