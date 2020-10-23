import React, {useEffect, useState} from 'react';
import './App.scss';
import FakeLogo from "./images/Fakestagram-logo.jpg";
import Posts from "./Posts/Posts";


function App() {

    return (
        <div className="app">
            <div className="app__header">
                <img className="fakeLogo" alt="FakeLogo" src={FakeLogo}/>
            </div>
            <div className="sth">
                <Posts/>
            </div>
        </div>
    );
}

export default App;
