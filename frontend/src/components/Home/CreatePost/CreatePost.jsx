import axios from 'axios';
import React from 'react';
import { useState } from 'react';


const CreatePost = () => {
    const [message, setMessage] = useState('');
    // const [postPicture, setPostPicture] = useState(null);

    
    const user = document.cookie.split('=');
    console.log(user[1]);

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    }

    const data = {
        content: message
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.post(`${process.env.REACT_APP_API_URL}api/post/`, data, config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
        
    }
            

    return (
        <div className='createPost-container'>
            <div className='formPost-container'>
                <div className='imageUser'>
                </div>
                <form onSubmit={handleSubmit} className="formCreate-container">
                    <textarea 
                    cols="30" 
                    rows="10" 
                    placeholder='Message ...'
                    className='text-container'
                    onChange={(e) => {
                    setMessage(e.target.value)
                    }}
                    value={message}
                    required>
                    </textarea>

                    <button type="submit" value="Envoyer" className='btn-createPost'>Envoyer</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;