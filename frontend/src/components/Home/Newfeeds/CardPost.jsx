import React from 'react';

const CardPost = ({post}) => {
    return (
        <li>
            <h2>{post.content}</h2>
            <h3>{post.UserId}</h3>
        </li>
    );
};

export default CardPost;