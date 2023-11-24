import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.module.css';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/start">Start</NavLink>
                </li>
                <li>
                    <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/week">Week</NavLink>
                </li>
                <li>
                    <NavLink to="/day">Day</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;