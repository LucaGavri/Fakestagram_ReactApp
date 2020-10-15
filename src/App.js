import React, { useEffect, useState } from 'react';
import './App.scss';
import axios from "axios";
import Person from "./Person";

const BASE_URL = 'https://dummyapi.io/data/api';
const APP_ID = '5f872421ba7ed862f6ed6d0a';

function App() {

    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/user`, { headers: { 'app-id': APP_ID } }).then(res => {
            console.log(res.data.data);
            setPersons(res.data.data)
        })
    }, []);

    return (
        <div className="app">
            <span className="title">Fakestagram</span>
            <div className="sth">
                {persons.map(person => (
                    <Person key={person.id} name={person.firstName + ' ' + person.lastName} email={person.email} img={person.picture} />
                ))
                }
            </div>
        </div>
    );
}

export default App;
