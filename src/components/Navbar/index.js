import { Component } from "react";
import React from 'react'
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";

export default class NavbarCustom extends Component {
    render() {
        // var isActive = this.context.router.route.location.pathname;
        // var className = isActive ? 'active' : '';
        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/donations">Lake County United</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/donors">Donors</Nav.Link>
                        <Nav.Link href="/institutions">Institutions</Nav.Link>
                        <Nav.Link href="/contacts">Contacts</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
            </>
        );
    };
}
