import React from 'react';
import Moment from "react-moment";
import 'moment/locale/fr';
import { UidContext } from '../../../../AppContext';
import { useContext } from 'react';
import axios from 'axios';



const Com = ({post, data}) => {

    const uid = useContext(UidContext);

    const user = document.cookie.split("=")

    const config = {
        headers: {
            "authorization": `bearer ${user[1]}`
        }
    };

    const deleteCom = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}api/com/${data.id}`, config)
        .then(() => console.log('com effacé'))
        .catch(err => console.log(err));

    }
    return (
        <>
            {
            post.id === data.PostId && (
                <li>
                     <p>{data.content}</p>
                    <p>{post.pseudo}</p>
                    <p ><Moment local="fr" fromNow >{data.createdAt}</Moment></p>
                    {data.UserId === uid  && (<button  onClick={deleteCom}>Supprimer</button>)}
                </li>
            )
}           
        </>
    );
    
};

export default Com;