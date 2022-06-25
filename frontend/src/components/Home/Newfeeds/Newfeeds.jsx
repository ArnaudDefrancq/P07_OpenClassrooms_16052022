import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import Moment from "react-moment";
import 'moment/locale/fr'

const Newfeeds = () => {

    const [loadPost, setLoadPost] = useState([]);
    const [loadUser, setLoadUser] = useState([]);

    const user = document.cookie.split('=');
    console.log(user[1]);

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/post/`, config)
        .then((res) => setLoadPost(res.data))
        .catch((err) => console.log(err))
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/auth/`)
        .then((res) => setLoadUser(res.data))
        .catch((err) => console.log(err))

    }, [])

    return (
        <div className='feed-container'>
            <h1 className='feed-title'>Publication récentes</h1>      
            <ul className='feed-list'>
                {
                    loadPost.map((post, index) => {
                        return <li key={index} className='publication'>
                            <div className='publication-user'>
                                <p>{
                                    loadUser.map((user) => {
                                        if (user.id === post.UserId) {
                                            return user.pseudo
                                        } else {
                                            return null
                                        }
                                    })
                                }
                                </p>
                                <p className='date-post'><Moment local="fr" fromNow >{post.createdAt}</Moment></p>

                            </div>
                            <div className='post'>
                                <p>{post.content}</p>
                                {
                                    post.attachment ? <img src={post.attachment} alt="user" /> : null
                                }
                            </div>
                        </li>
                    })

                }
            </ul>
        </div>
    );
};

export default Newfeeds;