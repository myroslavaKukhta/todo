import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';
import logo from "./img/logo.png";

export const NavBar = () => {
    return (
        <nav>
            <img
                src={logo}
                alt="logo"
                style={{ width: '60px', height: '60px'}}
            />
            <ul className={s.navList}>
                <li>
                    <NavLink to="/">Login</NavLink>
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
                <li>
                    <NavLink to="/news">News</NavLink>
                </li>
            </ul>
        </nav>
    );
};
