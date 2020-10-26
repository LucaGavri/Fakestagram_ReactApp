import React, {useEffect, useState} from 'react';
import './App.scss';
import FakeLogo from "./Images/Fakestagram-logo.jpg";
import Posts from "./Posts/Posts";
import {db, auth} from "./firebase";
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button} from "@material-ui/core";
import {Input} from '@material-ui/core'
import PostUpload from "./PostUpload/PostUpload";


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function App() {

    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openLogIn, setOpenLogIn] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);

                if (authUser.displayName) {

                } else {
                    return authUser.updateProfile({
                        displayName: username,
                    });
                }
            } else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user, username]);

    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, []);

    const signUp = (e) => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message));

        setOpen(false);
    }

    const logIn = (e) => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenLogIn(false);
    }

    return (
        <div className="app">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__modalForm">
                        <img className="app__fakeLogo" alt="FakeLogo" src={FakeLogo}/>
                        <Input
                            placeholder="uername"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder="e-mail"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>

            <Modal
                open={openLogIn}
                onClose={() => setOpenLogIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__modalForm">
                        <img className="app__fakeLogo" alt="FakeLogo" src={FakeLogo}/>

                        <Input
                            placeholder="e-mail"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={logIn}>Log In</Button>
                    </form>
                </div>

            </Modal>

            <div className="app__header">
                <img className="app__header__fakeLogo" alt="FakeLogo" src={FakeLogo}/>
                <div className="app__header__btns">
                    {user ? (
                        <button className="app__header__btns__logoutBtn" onClick={() => auth.signOut()}>Logout</button>
                    ) : (
                        <div className="app__header__btns__btns2">
                            <button className="app__header__btns__btns2__signUpBtn"
                                    onClick={() => setOpen(true)}>Sign Up</button>
                            <button className="app__header__btns__btns2__logInBtn"
                                    onClick={() => setOpenLogIn(true)}>Log In</button>
                        </div>
                    )}

                </div>

            </div>

            {user?.displayName ? (
                <div className="app__postUpload">
                    <PostUpload username={user.displayName}/>
                </div>
            ): (
                <p>You have to log in</p>
            )}

            <div className="app__posts">
                {
                    posts.map(({post, id}) => (
                            <Posts key={id} postId={id} user={user} username={post.username} caption={post.caption} postImg={post.postImg}/>
                        )
                    )
                }
            </div>



        </div>
    );
}

export default App;
