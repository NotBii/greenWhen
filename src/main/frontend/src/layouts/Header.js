import React, { useState } from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import SignUpModal from '../modals/SignUpModal'

const Header = () => {
    const [SignUpModalOn, setSignUpModalOn] = useState(false);
    return (
        <>
            <SignUpModal
                show={SignUpModalOn}
                onHide={() => setSignUpModalOn(false)}
            />
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">언제갈래?</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <Nav.Link>
                                    <Button variant="primary">Sign In</Button>
                                </Nav.Link>
                                <Nav.Link>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setSignUpModalOn(true)}
                                    >
                                        Sign Up
                                    </Button>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}

export default Header