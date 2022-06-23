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
        <div>
            <form onSubmit={handleSubmit}>
                <textarea 
                cols="30" 
                rows="10" 
                placeholder='Message ...'
                onChange={(e) => {
                    setMessage(e.target.value)
                }}
                value={message}
                required>
                </textarea>

                <button type="submit" value="Envoyer">Envoyer</button>
            </form>
        </div>
    );
};

export default CreatePost;