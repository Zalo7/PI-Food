import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Landing.css'

export default function LandingPage() {
    return (
        <div className="container-landing">
        <header className="landing-header">
            <div className="container-title">
            <h1 className="title">Welcome The Food Page!</h1>
            </div>
       <Link to ='/home'>
       <div className="wrapper">
          <button className="but"> GO!
                </button>
          </div>
       </Link>
       </header>
   </div>
)
}
    