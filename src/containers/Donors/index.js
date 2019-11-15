import DonorList from "../DonorList";
import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Donors(props) {
    return (
        <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '80em' }}>
                <Button style={{ float: 'right',width: '10em' }} href="/donor/create" variant="dark">Add Donor</Button>
            </Card>
        </div>
        <br></br>
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Card style={{ width: '80em' }}>
                <br></br>
                <br></br>
                <DonorList />
            </Card>
        </div>
        </div>
    );
}