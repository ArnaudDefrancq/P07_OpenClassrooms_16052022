import React from 'react';
import Moment from "react-moment";
import 'moment/locale/fr';
import { useState } from 'react';
import axios from 'axios';
import { UidContext } from '../../../AppContext';
import { useContext } from 'react';
import Author from './Author';


const CardPost = ({post}) => {

    // const [loadCom, setLoadCom] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);

    const uid = useContext(UidContext);


    const user = document.cookie.split("=")

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const updateItem = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('content', textUpdate)


        await axios.put(`${process.env.REACT_APP_API_URL}api/post/update/`, formData, config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }   

    const deletePost = () =>{}
    return (
        <div>
            <div className='publication-user'>
                 <Author post={post} />
                <p className='date-post'><Moment local="fr" fromNow >{post.createdAt}</Moment></p>
            </div>
            <div>
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
                <p>{uid}</p>
                {post.UserId === uid  && (<button onClick={() => setIsUpdated(!isUpdated)}>Modifier</button>)}
                {post.UserId === uid  && (<button  onClick={deletePost}>Supprimer</button>)}
            </div>  
        </div>    
    );
};

export default CardPost;