import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Com from './Com';

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
        ,[])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {
                loadCom.map((data) => {  
                    return <Com post={post} data={data} key={data.id} />
                })
            }         
        </>
    );
};

export default CardComs;