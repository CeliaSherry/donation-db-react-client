
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";


export default function DonationList(props) {
    console.log(props);
    return (

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "80em" }}>
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Contact Name</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                </tr>
            </tbody>
        </Table>
        </Card>
        </div>
    )

}