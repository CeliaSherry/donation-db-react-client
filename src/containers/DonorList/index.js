
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit,FaTrash} from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDonors: actions.getAllDonors,
        deleteDonor: actions.deleteDonor
    }, dispatch);
}

export class DonorList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
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


    handleSubmit = (id) => {
       //e.preventDefault();
        const { deleteDonor } = this.props;
        deleteDonor(id).then(response => {
            this.setState({ submitted: true })
            if (response.type === 'SUCCESS') {
                this.setState({ success: true })
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
        const { data } = this.state;
        //console.log(data);
        return (
            <div>
                <div ref={this.myRef}/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    {this.state.success && this.state.submitted ?
                        <Alert isOpen={this.state.visible} style={{width: "48rem"}} variant='success'> Successful donor
                            deletion</Alert>
                        : !this.state.success && this.state.submitted ?
                            <Alert style={{width: "48rem"}} variant='danger'> Error!</Alert> : ''}
                </div>
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
                {this.state.data?
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
                                onClick={this.handleSubmit(donor.id)}
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
            </div>
        );
    }

}

export default connect(null, mapDispatchToProps)(DonorList);