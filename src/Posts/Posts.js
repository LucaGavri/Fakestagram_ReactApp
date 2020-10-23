import React from "react";
import './Posts.scss';
import  Nebula from '../images/1200px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg';
import Avatar from "@material-ui/core/Avatar"

function Posts() {

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt=""
                    src="/static/images/avatar/1.jpg"
                />
                <p className="post__username"> username</p>
            </div>
            <img className="post__img" src={Nebula} alt="nebula"/>
            <p className="post__txt"><strong className="post__txt__username">username</strong>this is so awesome caption</p>
        </div>
    )
}

export default Posts;