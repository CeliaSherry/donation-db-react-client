import DonorList from "../DonorList";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InstitutionList from "../InstitutionList";


export class Institution extends Component {
  
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em" }}>
            <Button
              style={{ float: "right", width: "10em", marginBottom: "10px"}}
              href="/institutions/create"
              variant="dark"
            >
              Add Institution
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <br></br>
            <br></br>
            <InstitutionList />
          </Card>
        </div>
      </div>
    );
  }
}


