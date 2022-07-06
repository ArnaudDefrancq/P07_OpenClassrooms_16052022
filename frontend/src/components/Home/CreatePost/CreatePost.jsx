import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";


const CreatePost = () => {
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState('');
    const [imageAdded, setImageAdded] = useState(false);
    
    const user = document.cookie.split('=');
    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    }

    const onSubmit = async (e) => {
        const formData = new FormData();
        formData.append('content', message);
        formData.append('attachment', postPicture);

        console.log(formData);

        await axios.post(`${process.env.REACT_APP_API_URL}api/post/`,formData , config)
        .then((res) => console.log(res))
        .catch(err => console.log(err));
    }

    return (
        <div className='createPost-container'>
            <div className='formPost-container'>
                <form  className="formCreate-container" onSubmit={onSubmit}>
                    <textarea 
                    placeholder='Message ...'
                    className='text-container'
                    onChange={(e) => {
                    setMessage(e.target.value)
                    }}
                    value={message}
                    >
                    </textarea>
                    <div className='add-picture-container'>
                        <input 
                        type="file"
                        name='attachment'
                        id='picture'
                        onChange={(e) => {
                            setPostPicture(e.target.files[0])
                        }}
                        className="test"
                        />
                        <label htmlFor="picture" >
                        <FontAwesomeIcon className='add-picture' icon={faImages} color={imageAdded ? "#f57251" : null} />
                        </label>
                        <button type="submit" value="Envoyer"   className='btn-createPost'><FontAwesomeIcon icon={faPaperPlane} /></  button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;