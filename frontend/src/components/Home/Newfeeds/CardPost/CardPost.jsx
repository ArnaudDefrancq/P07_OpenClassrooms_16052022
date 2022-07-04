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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faFile, faFilePen, faImages, faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import Like from './Like';


const CardPost = ({post}) => {

    // const [loadCom, setLoadCom] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState("");
    const [pictureUpdate, setPictureUpdate] = useState("");
    const [imageAdded, setImageAdded] = useState(false);

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
        <div className='post-card'>
            <div className='publication-user'>
                 <Author post={post} />
                <p className='date-post'><Moment local="fr" fromNow >{post.createdAt}</Moment></p>
            </div>
            
                {isUpdated === false && (
                    <div className='post'>
                        <p className='post-content'>{post.content}</p>
                        {post.attachment ? <div className='center'> <img className='picture' src={post.attachment} alt="user" /> </div> : null}
                    </div>)}
                {isUpdated === true && (
                    <div className='update-post-container'>
                        <textarea 
                        defaultValue={post.content}
                        onChange={(e) => {
                        setTextUpdate(e.target.value)
                        }}
                        id='picture' 
                        className='new-post'
                        />
                        {/* {post.attachment ? <div> <img src={post.attachment} alt="user" /> </div> : null} */}
                        <div>
                            <input 
                            type="file"
                            name='attachment'
                            defaultValue={post.attachment}
                            onChange={(e) => {
                                setPictureUpdate(e.target.files[0])
                            }}
                            />
                            <label htmlFor="picture" >
                            <FontAwesomeIcon className='add-picture' icon={faImages} color={imageAdded ? "#f57251" : null} /></label>
                            <button onClick={updateItem}>Modifier</button>
                        </div>
                    </div>
                )}
                <div className='option-post'>
                    {post.UserId === uid  && (<button onClick={() =>    setIsUpdated(!isUpdated)} className='update-post'><FontAwesomeIcon icon={faFile} /></button>)}
                    {post.UserId === uid  && (<button  onClick={deletePost} className='update-post'><FontAwesomeIcon icon={faTrash} /></button>)}
                </div>
                <p className='commentaire'>Commentaires</p>
            {/* <Like post={post} /> */}
            <CreateCom post={post} />
            <ul><CardCom post={post} /></ul>
        </div>    
    );
};

export default CardPost;