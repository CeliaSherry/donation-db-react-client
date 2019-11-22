import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Component } from "react";
import React from 'react'

export default class DonorListItem extends Component {

  render() {
    const {donor} = this.props.donor;
    console.log(donor);
    return (
        <>
       <Card body>{donor.donorName}</Card>
      </>
    );
  }
}


