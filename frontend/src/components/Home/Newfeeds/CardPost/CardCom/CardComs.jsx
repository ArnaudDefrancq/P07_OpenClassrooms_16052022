import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

const CardComs = ({post}) => {

    const [loadCom, setLoadCom] = useState([]);

    const user = document.cookie.split("=")

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/com`, config)
        .then((res) => setLoadCom(res.data))
        .catch(err => console.log(err))}        
        ,[]);
    return (
        <>
            {
                loadCom.map((data) => {  
                    if (post.id === data.PostId) {
                        return <li key={data.id}>{data.content}</li>    
                    } 
                })
            }
        </>
    );
};

export default CardComs;