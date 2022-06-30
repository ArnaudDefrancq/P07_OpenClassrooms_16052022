import React from 'react';
import { useState } from 'react';
import { UidContext } from '../../../AppContext';
import { useContext } from 'react';
import { useEffect } from 'react';

const Like = ({post}) => {

    const [liked, setLiked] = useState(false);

    const uid = useContext(UidContext);


    return (
        <div>
            
        </div>
    );
};

export default Like;