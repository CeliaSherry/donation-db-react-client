
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import Institution from "../CreateInstitution";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllInstitutions: actions.getAllInstitutions,
    }, dispatch);
}

export class InstitutionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        this.props.getAllInstitutions().then(response => {
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
                    </tr>
                </thead>
             
                <tbody>
                {this.state.data ?
                    data.map(institution => (
                        <tr>
                            <td>{institution.id}</td>
                            <td><Link to={`/institutions/${institution.id}/contacts`}>{institution.institutionName}</Link></td>
                            <td>{institution.address}</td>
                            <td>{institution.city}</td>
                            <td>{institution.state}</td>
                            <td>{institution.zipCode}</td>
                        </tr>
                    )) :''
                }
                </tbody>
            </Table>
        );
    }

}

export default connect(null, mapDispatchToProps)(InstitutionList);