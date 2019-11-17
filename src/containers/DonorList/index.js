
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import FormGroup from "react-bootstrap/FormGroup";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { bindActionCreators } from "redux";
import { exportSpecifier } from "@babel/types";
// import { connect } from "tls";
import { connect } from "react-redux";
import * as actions from "./actions";

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAllDonors: actions.getAllDonors,
      }, dispatch);
  }

export class DonorList extends Component  {
    constructor(props) {
        super(props)
        this.state = {
          data: []
        }
      }
    
      componentWillMount() {
        this.props.getAllDonors().then(response => {
          console.log('Data fetched', response)
          this.setState({
            data: response.payload
          })
        })
      }
    
//     componentWillMount () {
//          this.getAllDonors();
//     }

//   getAllDonors = () =>{
//       try{
//            this.props.getAllDonors()
//       }catch(e){

//       }
//   };

    render(){
        const { data } = this.state;
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Institution</th>
                    </tr>   
                </thead>
                <tbody>
               { data.map(donor => (
                    <tr>
                        <td>{donor.id}</td>
                        <td>{donor.donorName}</td>
                        <td>Last Name</td>
                        <td>{donor.email}</td>
                        <td>{donor.phone}</td>
                        <td>{donor.address}</td>
                        <td>Institution</td>
                    </tr>
               ))}
                </tbody>
            </Table>
        );
    }
    
}
  
  export default connect(null,mapDispatchToProps)(DonorList);