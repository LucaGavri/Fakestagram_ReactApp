import React from 'react';
import './App.scss';
import Data from './data';

function App() {
    return (
        <div className="app">
            <span className="title">Fakestagram</span>
            <div className="sth">
                <Data />
            </div>
        </div>
    );
}

export default App;
