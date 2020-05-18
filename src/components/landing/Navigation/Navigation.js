import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { history } from '../../../utils/history';

const navigation = () => {
    // <nav className="navbar fixed-top navbar-dark bg-dark">
    //     <div>
    //         <span className="navbar-text right">
    //             Navbar text with an inline element
    //         </span>
    //     </div>
    // </nav>
    let user = JSON.parse(sessionStorage.getItem('user'));
    console.log("USER : ", user)
    return(
    <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Collapse className="justify-content-end" >
    <NavDropdown title={user.full_name} id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={() => {
            sessionStorage.clear();
            console.log(sessionStorage.getItem('user'))
            console.log(sessionStorage.getItem('loggedIn'))
            window.location.reload();}
        }>Logout</NavDropdown.Item>
      </NavDropdown>
  </Navbar.Collapse>
    </Navbar>);
};




{/* <Navbar>
  <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
      Signed in as: <a href="#login">Mark Otto</a>
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar> */}

export default navigation;