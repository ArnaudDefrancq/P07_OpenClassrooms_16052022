import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import CardPost from "./CardPost";

const Newfeeds = () => {

    const [loadPost, setLoadPost] = useState([]);

    const user = document.cookie.split('=');
    console.log(user[1]);

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    }


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/post/`, config)
        .then((res) => setLoadPost(res.data))
        .catch((err) => console.log(err))
    }, [])

    return (
        <div className='feed-container'>
            <h1 className='feed-title'>Publication récentes</h1>      
            <ul className='feed-list'>
                {
                     loadPost.map((post, index) => {
                        return <CardPost key={index} post={post} />
                    })
                }
            </ul>
        </div>
    );
};

export default Newfeeds;