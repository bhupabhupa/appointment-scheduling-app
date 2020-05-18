import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';

const navigation = () => {
    // <nav className="navbar fixed-top navbar-dark bg-dark">
    //     <div>
    //         <span className="navbar-text right">
    //             Navbar text with an inline element
    //         </span>
    //     </div>
    // </nav>
    let user = JSON.parse(sessionStorage.getItem('user'));
    return(
    <Navbar fixed="top" bg="dark" variant="dark">
        <Navbar.Collapse className="justify-content-end" >
    <NavDropdown title={user.full_name} id="collasible-nav-dropdown">
        <NavDropdown.Item onClick={() => {
            sessionStorage.clear();
            window.location.reload();}
        }>Logout</NavDropdown.Item>
      </NavDropdown>
  </Navbar.Collapse>
    </Navbar>);
};

export default navigation;