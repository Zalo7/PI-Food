import React from 'react';
import { BsSearch } from "react-icons/bs";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Chefsito from '../images/Chefsito.png'
import { useDispatch } from 'react-redux';
import { getNameRecipes } from '../actions/index';
import '../styles/SearchBar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState();

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getNameRecipes(name))
    }


    return (
        <div className="container-search">
            <div className="Logo">
            <Link to="/"> <img className="Logo" alt="Not found" id="" src={Chefsito} width="15px" />
             </Link> 
            </div>
            <h4 className="title">Food App</h4>
            <input  
            className="input-search"
            type='text'
            placeholder='Search...'
            onChange= {(e) => handleInputChange(e)}
            />
          <BsSearch className="icon" size={25} type='submit' 
            onClick= {(e) => handleSubmit(e)} />
            <div className="create">
                    <Link to="/create"><p className="create-nav">Create Recipe</p></Link>
                </div>
             </div>
    )
}

