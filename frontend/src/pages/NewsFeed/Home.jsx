import React from 'react';
import Header from '../../components/Header/Header';
import CreatePost from '../../components/Home/CreatePost/CreatePost';
import Newfeeds from '../../components/Home/Newfeeds/Newfeeds';


const NewFeed = () => {

    

    return (
        <>
        <header>
            <Header />
        </header>
        <main>
            <div className='post-container'>
                <CreatePost />
                <Newfeeds />
            </div>
        </main>
        </>
    );
};

export default NewFeed;