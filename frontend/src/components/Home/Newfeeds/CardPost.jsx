import React from 'react';

const CardPost = ({post}) => {
    return (
        <li className='publication'>
            <div className='publication-user'>
                <div className='image'>
                    <div className='userImage'></div>
                    </div>
                <div className='description'>
                    <p className='userName'>{post.UserId}</p>
                    <p className='publicationDate'>{post.createdAt}</p>
                </div>
            </div>
            <div className='post'>
                <h2>{post.content}</h2>
            </div>
        </li>
    );
};

export default CardPost;