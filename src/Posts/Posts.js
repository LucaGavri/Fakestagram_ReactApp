import React from "react";
import './Posts.scss';
import  Nebula from '../images/1200px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg';

function Posts() {

    return (
        <div className="post">
            <h4>username</h4>
            <img className="post__img" src={Nebula} alt="nebula"/>
            <p>username + caption</p>
        </div>
    )
}

export default Posts;