import React from 'react';
import Moment from "react-moment";
import 'moment/locale/fr';
import { useState } from 'react';
import axios from 'axios';
import { UidContext } from '../../../AppContext';
import { useContext } from 'react';
import Author from './Author';
import CreateCom from '../CardPost/CardCom/CreateCom'
import CardCom from '../CardPost/CardCom/CardComs';


const CardPost = ({post}) => {

    // const [loadCom, setLoadCom] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState("");
    const [pictureUpdate, setPictureUpdate] = useState("");

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
        formData.append('attachment', pictureUpdate)

        console.log(textUpdate);


        await axios.put(`${process.env.REACT_APP_API_URL}api/post/update/${post.id}`, formData, config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }   

    const deletePost = () =>{
        axios.delete(`${process.env.REACT_APP_API_URL}api/post/${post.id}`, config)
        .then(() => console.log('post effacé'))
        .catch(err => console.log(err));
    }
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
                        {post.attachment ? <img src={post.attachment} alt="user" /> : null}
                        <input 
                        type="file"
                        name='attachment'
                        onChange={(e) => {
                        setPictureUpdate(e.target.files[0])
                        }}
                        />

                        <button onClick={updateItem}>Modifier</button>
                    </div>
                )}
                <p>postID = {post.UserId}</p>
                <p>{post.id}</p>
                <p>{uid}</p>
                {post.UserId === uid  && (<button onClick={() => setIsUpdated(!isUpdated)}>Modifier</button>)}
                {post.UserId === uid  && (<button  onClick={deletePost}>Supprimer</button>)}
            </div>
            <CardCom post={post} />
            <CreateCom post={post} />
        </div>    
    );
};

export default CardPost;