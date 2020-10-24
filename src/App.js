import React, {useEffect, useState} from 'react';
import './App.scss';
import FakeLogo from "./images/Fakestagram-logo.jpg";
import Posts from "./Posts/Posts";
import { db } from "./firebase";

function App() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()));
        })
    }, []);

    console.log(posts)

    return (
        <div className="app">
            <div className="app__header">
                <img className="fakeLogo" alt="FakeLogo" src={FakeLogo}/>
            </div>
            <div className="app__posts">
                {
                    posts.map(post => (
                            <Posts username={post.username} caption={post.caption} postImg={post.postImg}/>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default App;
