import React from "react";
import './Posts.scss'

const Posts = ({postText, likes, postImg, postName, postDate}) => {

    return (
        <div className='post'>
            <p className='postName'>{postName}</p>
            <img src={postImg} alt={postText}/>
            <div className="likesAndDate">
                <p className='likes'><i className="far fa-heart"></i>{likes}</p>
                <p className='postDate'>{postDate}</p>
            </div>
            <p className='postText'>{postText}</p>
        </div>
    )
}

export default Posts;