import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import SignUpModal from '../../modals/SignUpModal'
import SignInModal from '../../modals/SignInModal'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';


const MainNavigation = () => {

  const authCtx = useContext(AuthContext);
  const [usernickname, setUserNickname] = useState('');
  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;

  const [SignUpModalOn, setSignUpModalOn] = useState(false);
  const [SignInModalOn, setSignInModalOn] = useState(false);

  const callback = (str: string) => {
    setUserNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
      setSignInModalOn(false);
    }
  }, [isLogin]);

  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.usernickname);
    }
  }, [isGet]);


  const toggleLogoutHandler = () => {
    authCtx.logout();
  }


  return (
    <>
      <SignUpModal
        show={SignUpModalOn}
        onHide={() => setSignUpModalOn(false)} />
      <SignInModal
        show={SignInModalOn}
        onHide={() => setSignInModalOn(false)} />
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home"><Link to='/'><div>언제갈래?</div></Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link>
                  <Button
                    variant="primary"
                    onClick={() => setSignInModalOn(true)}
                  >
                    Sign In
                  </Button>
                </Nav.Link>
                {!isLogin && <Nav.Link> <Button variant="outline-primary" onClick={() => setSignInModalOn(true)}>Login</Button></Nav.Link>}                
                {!isLogin && <Nav.Link> <Button variant="outline-primary" onClick={() => setSignUpModalOn(true)}>Sign-Up</Button></Nav.Link>}
                {isLogin && <Nav.Link> <Button variant="outline-primary"><Link to='/profile'>{usernickname}</Link></Button></Nav.Link>}
                {isLogin && <Nav.Link> <Button variant="outline-primary" onClick={toggleLogoutHandler}>Logout</Button></Nav.Link>}
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
  );
};

export default MainNavigation;