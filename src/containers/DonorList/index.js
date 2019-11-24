
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDonors: actions.getAllDonors,
    }, dispatch);
}

export class DonorList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.getAllDonors().then(response => {
            this.setState({
                data: response.payload
            }) 
        })
    }

    render() {
        const { data } = this.state;
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Institution</th>
                    </tr>
                </thead>
             
                <tbody>
                {this.state.data ?
                    data.map(donor => (
                        <tr>
                            <td>{donor.id}</td>
                            <td><Link to={`/donors/${donor.id}/donations`}>{donor.donorName}</Link></td>
                            <td>{donor.email}</td>
                            <td>{donor.phone}</td>
                            <td>{donor.address}</td>
                            <td>{donor.city}</td>
                            <td>{donor.state}</td>
                            <td>{donor.zipCode}</td>
                            <td>Institution</td>
                        </tr>
                    )) :''
                }
                </tbody>
            </Table>
        );
    }

}

export default connect(null, mapDispatchToProps)(DonorList);