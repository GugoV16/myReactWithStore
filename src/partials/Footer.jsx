import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <div className='w-100 bg-dark text-light position-fixed fixed-bottom'>
                <Navbar.Brand className="d-flex align-items-center justify-content-center m-0">
                    GStore
                </Navbar.Brand>
                <Nav className='d-flex align-items-center justify-content-center'>
                    <NavLink to="/" className='mr-3'>Home</NavLink>
                    <NavLink to="/about" className='mr-3'>About</NavLink>
                    <NavLink to="/posts">Posts</NavLink>
                </Nav>
        </div>
    )
}

export default Footer