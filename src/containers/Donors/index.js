import DonorList from "../DonorList";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


export class Donors extends Component {
  
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em" }}>
          <h3>Donors</h3>
            <Button
              style={{ float: "right", width: "10em", marginBottom: "10px"}}
              href="/donor/create"
              variant="dark"
            >
              Add Donor
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <br></br>
            <br></br>
            <DonorList />
          </Card>
        </div>
      </div>
    );
  }
}


