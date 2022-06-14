import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import CardPost from "./CardPost";

const Newfeeds = () => {

    const [loadPost, setLoadPost] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/post`)
        .then((res) => setLoadPost(res.data))
        .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <h1>fil d'actu</h1>
            <ul>
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