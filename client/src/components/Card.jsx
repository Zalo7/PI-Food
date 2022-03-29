import React from "react";
import '../styles/Card.css'

export default function Card({name, image, diets}) {
    return (
        <div className="container-cards">
            <div className="div-container">
            <h3 className="card-name">{name}</h3>
            <h5 className="card-diets">Diets: {diets}</h5>
            <img className="card-img" src={image} alt="img not found" width="150px" height="150px" />
            </div>
        </div>
    )
}