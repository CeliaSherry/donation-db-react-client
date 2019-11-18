
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit,FaTrash} from 'react-icons/fa';
import Button from "react-bootstrap/Button";

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
                        <th>Institution</th>
                        <th>Action</th>
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
                            <td>Institution</td>
                            <td>
                                <Button
                                style={{width: "8em", marginBottom: "10px", marginRight: "10px"}}
                                href={`/donor/${donor.id}/edit`}
                                variant="dark"
                            >
                                Edit Donor
                            </Button>
                                <Button
                                style={{width: "8em", marginBottom: "10px"}}
                                href="/donor/create"
                                variant="danger"
                            >
                                Delete Donor
                            </Button>
                            </td>
                        </tr>
                    )) :''
                }
                </tbody>
            </Table>
        );
    }

}

export default connect(null, mapDispatchToProps)(DonorList);