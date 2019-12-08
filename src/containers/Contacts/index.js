import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import  ContactList from "../ContactList";


export class Contacts extends Component {
  
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em", paddingLeft: "1em" }}>
          <h3>Contacts</h3>
            <Button
              style={{ float: "right", width: "10em", marginBottom: "10px"}}
              href="/contacts/create"
              variant="dark"
            >
              Add Contact
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <ContactList />
          </Card>
        </div>
      </div>
    );
  }
}


