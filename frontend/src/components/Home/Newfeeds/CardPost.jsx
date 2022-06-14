import React from 'react';

const CardPost = ({post}) => {
    return (
        <li>
            <h2>{post.message}</h2>
        </li>
    );
};

export default CardPost;