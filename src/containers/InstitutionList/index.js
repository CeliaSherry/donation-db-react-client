
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllInstitutions: actions.getAllInstitutions,
        deleteInstitution: actions.deleteInstitution
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

    handleSubmit = (e, id, index) => {
        e.preventDefault();
        const { deleteInstitution } = this.props;
        deleteInstitution(id).then(response => {
            this.setState({ submitted: true })
            if (response.type === 'SUCCESS') {
                this.setState({
                    success: true,
                    data: this.state.data.filter((_, i) => i !== index)
                })
            }
            if (response.type === 'FAILURE') {
                this.setState({ success: false })
            }
            setTimeout(() => {
                this.setState({ submitted: false });
            }, 3000);
        });
        // window.scrollTo(0, this.myRef.current.top);

    }

    render() {
        const { data } = this.state;
        return (
            <div>
                <div ref={this.myRef} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {this.state.success && this.state.submitted ?
                        <Alert isOpen={this.state.visible} style={{ width: "48rem" }} variant='success'> Successful institution
                        deletion</Alert>
                        : !this.state.success && this.state.submitted ?
                            <Alert style={{ width: "48rem" }} variant='danger'> Error!</Alert> : ''}
                </div>
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
                            data.map((institution, index) => (
                                <tr>
                                    <td>{institution.id}</td>
                                    <td><Link to={`/institutions/${institution.id}/contacts`}>{institution.institutionName}</Link></td>
                                    <td>{institution.address}</td>
                                    <td>{institution.city}</td>
                                    <td>{institution.state}</td>
                                    <td>{institution.zipCode}</td>
                                    <td>
                                        <Button
                                            title="Edit"
                                            style={{ marginBottom: "10px", marginRight: "10px" }}
                                            href={`/institutions/${institution.id}/edit`}
                                            variant="clear" >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            title="Delete"
                                            style={{ marginBottom: "10px" }}
                                            onClick={(e) => this.handleSubmit(e, institution.id, index)}
                                            variant="clear"
                                        >
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            )) : ''
                        }
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(InstitutionList);