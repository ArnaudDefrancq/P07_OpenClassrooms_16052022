import React from 'react';

const Author = ({post}) => {
    return (
        <>
            <p className='author-post'>{post.User.pseudo}</p>
        </>
    );
};

export default Author;