import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/day">
                        Day
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/week">
                        Week
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;