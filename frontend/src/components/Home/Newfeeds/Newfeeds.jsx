import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import Moment from "react-moment";
import 'moment/locale/fr'
import CreateCom from '../CreateCom/CreateCom';
import UpdatePost from '../UpdatePost/UpdatePost';
import { UidContext } from '../../AppContext';
import { useContext } from 'react';

const Newfeeds = () => {

    const [loadPost, setLoadPost] = useState([]);
    const [loadUser, setLoadUser] = useState([]);
    const [loadCom, setLoadCom] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const uid = useContext(UidContext);

    const user = document.cookie.split("=")
    // console.log(user[1]);


//  recuperer l'userId avec le fait de trouver 1 seul
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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}api/com/`)
        .then((res) => setLoadCom(res.data))
        .catch(err => console.log(err))
    }, [])

    const updateItem = async (e) => {
        e.preventDefault()

        const data = {
            content: textUpdate,
        }

        console.log(data);

        await axios.put(`${process.env.REACT_APP_API_URL}api/com/`, data, config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }   

    const deletePost = () =>{}

    return (
        <div className='feed-container'>
            <h1 className='feed-title'>Publication récentes</h1>      
            <ul className='feed-list'>
                {
                    loadPost.map((post) => {
                        return <li key={post.id} className='publication'>
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

                            {isUpdated === false && (
                                <div className='post'>
                                    <p>{post.content}</p>
                                    {post.attachment ? <img src={post.attachment} alt="user" /> : null}
                                </div>)}
                            {isUpdated === true && (
                                <div>
                                    <textarea 
                                    defaultValue={post.content}
                                    onChange={(e) => {
                                        setTextUpdate(e.target.value)
                                    }}
                                    />
                                    <button onClick={updateItem}>Modifier</button>
                                </div>
                            )}
                            <p>postID = {post.UserId}</p>
                                {post.UserId === uid  && (<button key={user.id} onClick={() => setIsUpdated(!isUpdated)}>Modifier</button>)}
                                {post.UserId === uid  && (<button key={user.id} onClick={deletePost}>Supprimer</button>)}

                            <div>


                            </div>


                            <div>
                                <ul>
                                    {
                                        loadCom.map((data) => {
                                            if (data.PostId === post.id) {
                                                return <li key={data.id}>{data.content}</li>
                                            } else {
                                                return null
                                            }
                                        })
                                    }
                                </ul>
                                <CreateCom post={post}/>
                            </div>


                        </li>
                    })

                }
            </ul>
        </div>
    );
};

export default Newfeeds;