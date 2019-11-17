import DonorList from "../DonorList";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { bindActionCreators } from "redux";
import { exportSpecifier } from "@babel/types";
// import { connect } from "tls";
import { connect } from "react-redux";
import * as actions from "./actions";

export class Donors extends Component {
  
  render() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
            <Button
              style={{ float: "right", width: "10em" }}
              href="/donor/create"
              variant="dark"
            >
              Add Donor
            </Button>
          </Card>
        </div>
        <br></br>
        <br></br>
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


