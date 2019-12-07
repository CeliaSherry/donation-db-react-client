
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Pagination from '../../components/Pagination';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllInstitutions: actions.getAllInstitutions,
        deleteInstitution: actions.deleteInstitution,
        getAllInstitutionsSortedAscendingName: actions.getAllInstitutionsSortedAscendingName,
        getAllInstitutionsSortedDescendingName: actions.getAllInstitutionsSortedDescendingName,
        getAllInstitutionsSortedAscendingState: actions.getAllInstitutionsSortedAscendingState,
        getAllInstitutionsSortedDescendingState: actions.getAllInstitutionsSortedDescendingState
    }, dispatch);
}

export class InstitutionList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: [],
            pageOfInstitution: []
        }
        this.onChangePage = this.onChangePage.bind(this);
        this.onNameButtonClick = this.onNameButtonClick.bind(this);
        this.onStateButtonClick = this.onStateButtonClick.bind(this);
    }

    componentWillMount() {
        this.props.getAllInstitutions().then(response => {
            this.setState({
                data: response.payload
            })
        })
    }
    onChangePage(pageOfInstitution) {
        // update state with new page of items
        this.setState({ pageOfInstitution: pageOfInstitution });
    }

    onNameButtonClick() {
        if (!this.orderNameDescending) {
            this.props.getAllInstitutionsSortedAscendingName().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
        }
        else{
            this.props.getAllInstitutionsSortedDescendingName().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
        }
        this.orderNameDescending = !this.orderNameDescending;
    }

    onStateButtonClick() {
        if (!this.orderStateDescending) {
            this.props.getAllInstitutionsSortedAscendingState().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
        }
        else{
            this.props.getAllInstitutionsSortedDescendingState().then(response => {
                this.setState({
                                  data: response.payload
                              })
            })
        }
        this.orderStateDescending = !this.orderStateDescending;
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
        window.scrollTo(0, this.myRef.current.top);

    }

    render() {
        
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
                            <button onClick={this.onNameButtonClick.bind(this)}>
                                <th>Name</th>
                            </button>
                            <th>Address</th>
                            <th>City</th>
                            <button onClick={this.onStateButtonClick.bind(this)}>
                                <th>State</th>
                            </button>
                            <th>Zip Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.length > 0 ?
                            this.state.pageOfInstitution.map((institution, index) => (
                                    <tr key={index}>
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
                <Pagination items={this.state.data} onChangePage={this.onChangePage} />
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(InstitutionList);