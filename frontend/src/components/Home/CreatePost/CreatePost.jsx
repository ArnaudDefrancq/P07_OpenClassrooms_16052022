import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';
import { useRef } from 'react';


const CreatePost = () => {
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState('');
    // const [imageAdded, setImageAdded] = useState('');
    const [preview, setPreview] = useState('');
    const fileInputRef = useRef();
    
    const user = document.cookie.split('=');
    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    }

    useEffect(() => {
        if (postPicture) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            }
            reader.readAsDataURL(postPicture)
        } else {
            setPreview(null)
        }
    }, [postPicture])

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append('content', message);
        formData.append('attachment', postPicture);

        console.log(formData);

        await axios.post(`${process.env.REACT_APP_API_URL}api/post/`,formData , config)
        .then((res) => console.log(res))
        .catch(err => console.log(err));

        document.location.reload();
    }
    // onSubmit={onSubmit}

    return (
        <div className='createPost-container'>
            <div className='formPost-container'>
                <form  className="formCreate-container" onSubmit={onSubmit} >
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
                    <img src={preview} alt="" />
                        <input 
                        type="file"
                        name='attachment'
                        id='picture'
                        onChange={(e) => {
                            setPostPicture(e.target.files[0]);

                        }}
                        ref={fileInputRef}
                        className="test"
                        // onInput={setImageAdded}
                        />
                        {/* <label htmlFor="picture" >Modifier */}
                        {/* <FontAwesomeIcon className='add-picture' icon={faImages} color={imageAdded ? "#f57251" : null} /> */}
                        {/* </label> */}
                        <button onClick={(e) => {
                            e.preventDefault(); 
                            fileInputRef.current.click()
                            }}>Ajouté une image</button>
                        <button type="submit" value="Envoyer"  className='btn-createPost'><FontAwesomeIcon icon={faPaperPlane} /></  button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;