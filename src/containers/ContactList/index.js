
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllContacts: actions.getAllContacts,
    }, dispatch);
}

export class ContactList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.getAllContacts().then(response => {
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
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Institution</th>
                    </tr>
                </thead>
             
                <tbody>
                {this.state.data ?
                    data.map(contact => (
                        <tr>
                            <td>{contact.id}</td>
                            <td>{contact.contactName}</td>
                            <td>{contact.address}</td>
                            <td>{contact.city}</td>
                            <td>{contact.state}</td>
                            <td>{contact.zipCode}</td>
                            <td>{contact.institutionName}</td>
                        </tr>
                    )) :''
                }
                </tbody>
            </Table>
        );
    }

}

export default connect(null, mapDispatchToProps)(ContactList);