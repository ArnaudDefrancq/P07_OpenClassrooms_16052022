import React from 'react';

const Author = ({post}) => {
    return (
        <>
            <p className='author-post'>{post.pseudo}</p>
        </>
    );
};

export default Author;