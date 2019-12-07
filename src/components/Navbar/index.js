import { Component } from "react";
import React from 'react'
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class NavbarCustom extends Component {
    render() {
        // var isActive = this.context.router.route.location.pathname;
        // var className = isActive ? 'active' : '';
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Lake County United</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/donors">Donors</Nav.Link>
                        <Nav.Link href="/institutions">Institutions</Nav.Link>
                        <Nav.Link href="/contacts">Contacts</Nav.Link>
                        <Nav.Link href="/search">Search Donations</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
            </>
        );
    };
}
