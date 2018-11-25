import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ()=>{
    return(
        <div className={'Navigation mb-4'}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-white rounded fixed-top">
                <NavLink to="/" className="brand-logo font-weight-bold"><img src={require('./../../assets/tasks.png')}/> MY TO-DO APP  </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto d-flex justify-content-around">
                        <li><NavLink className={'font-weight-bold'} to="/">ToDos</NavLink></li>
                        <li><NavLink className={'font-weight-bold'} to="/trello">Like Trello</NavLink></li>
                        <li><NavLink className={'font-weight-bold'} to="/users">Users</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;