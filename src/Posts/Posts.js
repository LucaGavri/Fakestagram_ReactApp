import React, {useEffect, useState} from "react";
import './Posts.scss';
import Avatar from "@material-ui/core/Avatar"
import {db} from "./../firebase";
import firebase from "firebase";

function Posts({username, caption, postImg, postId, user}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');


    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            txt: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }

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
            <img className="post__img" src={postImg} alt=""/>
            {/*<div className="post__likes">*/}
            {/*    <i className="far fa-heart post__likes__emptyHeart"></i>*/}
            {/*    <i className="fas fa-heart post__likes__fullHeart"></i>*/}
            {/*    <input className="post__likes__numLikes" type="number" value="555"/>*/}
            {/*</div>*/}
            <p className="post__txt"><strong className="post__txt__username">{username}</strong>{caption}
            </p>
            <div className="post__comments">
                {comments.map((comment) => (
                    <p className="post__comments__comment">
                        <b>{comment.username}</b> {comment.txt}
                    </p>
                ))}
            </div>

            {user && (
                <form className="post__commentForm">
                    <input
                        className="post__commentForm__input"
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        disabled={!comment}
                        className="post__commentForm__btn"
                        type="submit"
                        onClick={postComment}
                    >
                        Add
                    </button>
                </form>
            )}

        </div>
    )
}

export default Posts;