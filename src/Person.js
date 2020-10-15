import React from "react";
import './Person.scss'

const Person = ({name, email, img}) => {
    return (
        <div className='person'>
            <h3>{name}</h3>
            <p>{email}</p>
            <img src={img} alt={name}/>
        </div>
    )
}

export default Person;