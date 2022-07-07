
import React from 'react';
import Com from './Com';

const CardComs = ({post}) => {
    return (
        <>
            
            {
                post.Comments.map((com) => {  
                    return <Com post={post} com={com} key={com.id} />
                })
            }         
        </>
    );
};

export default CardComs;