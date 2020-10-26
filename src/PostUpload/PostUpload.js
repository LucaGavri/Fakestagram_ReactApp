import React, {useState} from "react";
import "./PostUpload.scss";
import firebase from "firebase";
import {db, storage} from './../firebase';
import {Button} from "@material-ui/core";

function PostUpload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    // const [url, setUrl] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error.message);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            postImg: url,
                            username: username
                        });

                        setProgress(0);
                        setCaption('');
                        setImage(null)

                    })
            }
        )
    }

    return (
        <div className="postUpload">
            <p>Add the post!</p>
            <progress className="postUpload__progress" value={progress} max="100"/>
            <input className="postUpload__caption" type="text" placeholder="Caption for the post..." onChange={e => setCaption(e.target.value)}
                   value={caption}/>
            <input className="postUpload__addFile" type="file" onChange={handleChange}/>
            <Button className="postUpload__btn" onClick={handleUpload}>
                Upload
            </Button>

        </div>
    )
}

export default PostUpload;