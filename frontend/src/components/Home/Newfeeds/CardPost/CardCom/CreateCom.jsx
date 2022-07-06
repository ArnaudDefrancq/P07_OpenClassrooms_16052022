import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CreateCom = ({post}) => {

    const [comValue, setComValue] = useState([]);

    const user = document.cookie.split('=');


    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const handleSubmit = async (e) => {

        const data = {
            content: comValue,
            PostId: `${post.id}`
        }

        console.log(data);

        await axios.post(`${process.env.REACT_APP_API_URL}api/com/`, data, config)
        .then((res) => console.log(res))
        .catch(err => console.log(err))

        window.location.reload()
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className='create-com'>
                <textarea
                    onChange={(e) => {
                        setComValue(e.target.value)
                    }}
                    value={comValue}
                    className="com-container"
                    placeholder='Commentaire ...'
                />
                <button type="submit" className='btn-com'><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
        </div>
    );
};

export default CreateCom;