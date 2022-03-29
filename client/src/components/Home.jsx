import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, getDiets, filterByTypes, orderByName, filterByHealth } from '../actions';
import {Link} from 'react-router-dom'

import Paginado from './Paginate';
import SearchBar from './SearchBar';
import { BsArrowRepeat } from "react-icons/bs";
import '../styles/Home.css'
import NotFound from './NotFound';

export default function Home() {

    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets);
    const [, setOrderHealth] = useState('');
    const [,setOrden] = useState("");
    const currentRecipes = useSelector((state) => state.recipes);

    useEffect (() => {
        dispatch(getRecipes());
    }, [dispatch])
    
    useEffect (() => {
        dispatch(getDiets());
    }, [dispatch])
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterTypes(e) {
        dispatch(filterByTypes(e.target.value));
    }

    function handleOrderName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderHealth(e) {
        dispatch(filterByHealth(e.target.value));
        setOrderHealth(`Ordenado${e.target.value}`)
    }

return (
<div>
<SearchBar/>
    <div className='fondo-home'>
        <div className='homie'>
        <BsArrowRepeat size={25} className="refresh" onClick={e => {handleClick(e)}} />    
        <select className="select-home" onChange={e => handleOrderName(e)}>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select onChange={(e) => {handleOrderHealth(e)}} >
                <option value='max'>Max HealthScore</option>
                <option value='min'>Min HealthScore</option>
            </select>
            <select className="select-home" onChange={(e) => {handleFilterTypes(e)}}>
        <option value="All">Types</option> 
        <div>
         {diets && diets.map((el) => {
           return <option key={el.id} value={el.name}>{el.name}</option> 
          })}
         </div>    
     </select>
     
          </div>
          <Paginado/>
          </div>
       </div>
)

}