
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Pagination from '../../components/Pagination';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDonors: actions.getAllDonors,
        deleteDonor: actions.deleteDonor,
        getAllDonorsSorted:actions.getAllDonorsSortedAscending
    }, dispatch);
}

export class DonorList extends Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef();
        this.state = {
            data: [],
            pageOfDonor: [],
            sortedData: []
        }
        this.onChangePage = this.onChangePage.bind(this);
        // this.sortBy = this.sortBy.bind(this);
    }

    componentWillMount() {
        this.props.getAllDonors().then(response => {
            this.setState({
                data: response.payload
            })
        })
    }

    // onSort(pageOfDonor) {
    //     // update state with new page of items
    //     this.setState({ sortedData: pageOfDonor});
    // }
    // sortBy(key){
    //     console.log(key);
    //     this.setState({
    //         data: this.state.data.sort((a,b) => a[key] < b[key])
    //                   })
    // }

    onChangePage(pageOfDonor) {
        // update state with new page of items
        this.setState({ pageOfDonor: pageOfDonor});
    }

    handleSubmit = (e, id, index) => {
        e.preventDefault();
        const { deleteDonor } = this.props;
        deleteDonor(id).then(response => {
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
                        <Alert isOpen={this.state.visible} style={{ width: "48rem" }} variant='success'> Successful donor
                            deletion</Alert>
                        : !this.state.success && this.state.submitted ?
                            <Alert style={{ width: "48rem" }} variant='danger'> Error!</Alert> : ''}
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <button
                                //onClick={ () => this.props.sortBy(this.donorName)}
                                //  onClick={ () => this.props.getAllDonorsSorted("ascending").then(response => {
                                //      this.setState({
                                //                        data: response.payload,
                                //                         pageOfDonor: this.pageOfDonor
                                //                    })
                                //                  })}
                            >
                            <th>Name</th>
                                </button>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Institution</th>
                            <th style={{ paddingLeft: "50px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.length > 0 ?
                            this.state.pageOfDonor.map((donor, index) => (
                                <tr key={index}>
                                    <td><Link to={{ pathname: `/donor/${donor.id}/donations`, state: { donorName: donor.donorName } }}>{donor.donorName}</Link></td>
                                    <td>{donor.email}</td>
                                    <td>{donor.phone}</td>
                                    <td>{donor.address}</td>
                                    <td>Institution</td>
                                    <td>
                                        <Button
                                            title="Edit"
                                            style={{ marginBottom: "10px", marginRight: "10px" }}
                                            href={`/donor/${donor.id}/edit`}
                                            variant="clear" >
                                            <FaEdit />
                                        </Button>
                                        <Button
                                            title="Delete"
                                            style={{ marginBottom: "10px" }}
                                            onClick={(e) => this.handleSubmit(e, donor.id, index)}
                                            variant="clear"
                                        >
                                            <FaTrash />
                                        </Button>
                                        <Link
                                           style={{ color: "black",marginLeft: "15px" }}
                                            to={{
                                                pathname: `/donor/${donor.id}/donation/create`,
                                                state: { donorName: donor.donorName  }
                                              }}
                                        >
                                            <FaPlus style={{height:"32px",paddingBottom:"4px"}}/>
                                        </Link>
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

export default connect(null, mapDispatchToProps)(DonorList);

