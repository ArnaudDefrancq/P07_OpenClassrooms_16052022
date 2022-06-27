import axios from 'axios';
import React from 'react';
import { useState } from 'react';


const CreatePost = () => {
    const [message, setMessage] = useState('');
    const [postPicture, setPostPicture] = useState('');
    
    const user = document.cookie.split('=');
    // console.log(user[1]);

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault() 

        const formData = new FormData();
        formData.append('content', message);
        formData.append('attachment', postPicture);

        await axios.post(`${process.env.REACT_APP_API_URL}api/post/`,formData , config)
        .then((res) => console.log(res))
        .catch(err => console.log(err));

        console.log(formData);
        
    }

    return (
        <div className='createPost-container'>
            <div className='formPost-container'>
                <div className='imageUser'>
                </div>
                <form  className="formCreate-container" onSubmit={onSubmit}>
                    <textarea 
                    placeholder='Message ...'
                    className='text-container'
                    onChange={(e) => {
                    setMessage(e.target.value)
                    }}
                    value={message}
                    required>
                    </textarea>

                    <input 
                    type="file"
                    name='attachment'
                    onChange={(e) => {
                        setPostPicture(e.target.files[0])
                    }}
                     />

                    <button type="submit" value="Envoyer" className='btn-createPost'>Envoyer</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;