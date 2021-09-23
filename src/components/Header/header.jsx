// IMPORT MOTORS
import React from 'react';
import { NavLink } from 'react-router-dom';
//IMPORT IMAGES
import Logo from '../../assets/Logos/logo.png';

const Header = () => {

    return (
        <header>
            <div id="logoBox">
                <img className="logo" src={Logo} alt="logo"></img>
            </div>
            <nav>
                <NavLink className="navLinks" to="/">home</NavLink>
                <NavLink className="navLinks" to="/data">data</NavLink>
                <NavLink className="navLinks" to="/login">login</NavLink>
            </nav>
        </header>
    )
}

export default Header;