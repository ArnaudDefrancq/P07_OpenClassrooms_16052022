import React from 'react';
import { useState } from 'react';
import { UidContext } from '../../../AppContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Like = ({post}) => {

    const [liked, setLiked] = useState(false);

    const user = document.cookie.split("=")

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const uid = useContext(UidContext);

    // useEffect(() => {
    //     axios.get(`${process.env.REACT_APP_API_URL}api/like`, config)
    //     .then((like) =>{
    //         console.log(like.data);
    //         setLiked(like.data)
    //     } )
    //     .catch(err => console.log(err));
    // }, [])


    return (
        <ul>
            {
            
            }
        </ul>
    );
};

export default Like;