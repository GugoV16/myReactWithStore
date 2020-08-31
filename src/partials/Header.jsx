import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
            <Navbar bg="dark" className='position-sticky sticky-top'>
                <Container>
                    <Navbar.Brand>
                        <NavLink to="/">
                            GStore
                        </NavLink>
                    </Navbar.Brand>
                    <Nav>
                        <NavLink to="/about" className='mr-3 text-light'>About</NavLink>
                        <NavLink to="/posts" className='text-light'>Posts</NavLink>
                    </Nav>
                </Container>
            </Navbar>
    )
}

export default Header