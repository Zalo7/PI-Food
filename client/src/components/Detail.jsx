import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetail } from '../actions';
import { useParams } from 'react-router-dom';
import '../styles/Detail.css';
import loading from '../images/cooking-chef.gif';


export default function Details() {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    },[dispatch, id])

    const recipe = useSelector((state) => state.detail);
    return (
        <div className="container-detail">
            {
                recipe ?
                <div className="detail">
                    <h2 className="name">{recipe.name}</h2>
                    <img className="img" src={recipe.image} alt="img not found..." />
                    {recipe.type?
                  <h3 className="type">DishType: {recipe.type}</h3> : null}
                    <h4 className="score">HealthScore: {recipe.score}⭐</h4>
                <h4 className="level">HealthLevel: {recipe.healthLevel}</h4>
                  <h5 className="summary">Resume:<div dangerouslySetInnerHTML={{ __html: recipe.summary}} /></h5>
                <h4 className="steps">Steps:<div dangerouslySetInnerHTML={{ __html: recipe.steps}} /></h4>
                <h3 className="diet">Diet: {!recipe.createdInDB? 
                recipe.diets + ', ' : recipe.dietTypes.map((e) => e.name + ', ')}</h3>
                </div>
                :
                <img className="gif-loading" src={loading} alt="Loading..." />
            }
               <Link to= '/home'>
               <button className="back-det"> BACK
                 </button> 
        </Link>
        </div>
    )
}