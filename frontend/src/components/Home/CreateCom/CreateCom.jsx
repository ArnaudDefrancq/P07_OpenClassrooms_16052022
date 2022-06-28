import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const CreateCom = ({post}) => {

    const [comValue, setComValue] = useState([]);

    const user = document.cookie.split('=');
    // console.log(user[1]);

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            content: comValue,
            PostId: `${post.id}`
        }

        console.log(data);

        await axios.post(`${process.env.REACT_APP_API_URL}api/com/`, data, config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>{post.id}</p>
                <textarea 
                    cols="30"
                    rows="10"
                    onChange={(e) => {
                        setComValue(e.target.value)
                    }}
                    value={comValue}
                ></textarea>
                <p></p>
                <button type="submit" >commenter</button>
            </form>
        </div>
    );
};

export default CreateCom;