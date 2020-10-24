import React from "react";
import './Posts.scss';
import Avatar from "@material-ui/core/Avatar"

function Posts({username, caption, postImg}) {

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <p className="post__username">{username}</p>
            </div>
            <img className="post__img" src={postImg} alt="nebula"/>
            <p className="post__txt"><strong className="post__txt__username">{username}</strong>{caption}
            </p>
        </div>
    )
}

export default Posts;