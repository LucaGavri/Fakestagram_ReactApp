import React from "react";
import './Posts.scss'

const Posts = ({postText, likes, postImg, postName}) => {

    return (
        <div className='post'>
            <p className='postName'>{postName}</p>
            <img src={postImg} alt={postText}/>
            <p><i className="far fa-heart"></i>{likes}</p>
            <p>{postText}</p>
        </div>
    )
}

export default Posts;