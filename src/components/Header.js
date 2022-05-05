import React from "react";
import {Navbar, Nav} from 'react-bootstrap'

import { connect } from "react-redux";


function Header(props) {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="px-4">
        <Navbar.Brand className="ml-2">Krypto Birdz NFTs (Non Fungible Tokens)</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link  active className="text-info">
              {props.account}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}
const mapStateToProps = (state) => {
  return {
    account: state.kryptoBirdzData.address
  };
};

export default connect(mapStateToProps)(Header);