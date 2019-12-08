import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import * as actions from "./actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { EditDonor } from "../EditDonor";
import DonationsList from "../DonationList";

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteDonor: actions.deleteDonor,
      getDonor: actions.getDonor,
      updateDonor: actions.updateDonor
    },
    dispatch
  );
}

export class DonorDetails extends Component {
    ref = React.createRef();
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      edit: false,
      success: false,
      hideDeleteButton:false,
      hideEditButtons:true

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e, id) => {
    e.preventDefault();
    const { deleteDonor } = this.props;
    deleteDonor(id).then(response => {
        this.setState({ submitted: true })
        if (response.type === 'SUCCESS') {
            this.setState({
                success: true,
            })
        }
        if (response.type === 'FAILURE') {
            this.setState({ success: false })
        }
        setTimeout(() => {
            this.setState({ submitted: false });
            this.props.history.push('/donors');
        }, 3000);
    });
    

}


  render() { 
      const disableButton = this.props.location.state.timesDonated > 0;
    return (
      <div  >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "80em" }}>
            <Button
             onClick={(e) => this.handleSubmit(e, this.props.match.params.donorId)}
              style={{
                float: "right",
                width: "10em",
                marginBottom: "10px",
                marginRight: "5px",
                color:"white"
              }}
              variant="dark"
              disabled={disableButton }
            
            >
              Delete Donor
            </Button>
            <Button
            onClick={(e) => this.setState({hideEditButtons : false})}
              style={{
                float: "right",
                width: "10em",
                marginBottom: "10px",
                marginRight: "5px",
                color:"white"
              }}
              variant="dark"
            >
              Edit Donor
            </Button>
          </div>
        </div>
        <div>
          <EditDonor hideEditButtons = {this.state.hideEditButtons} {...this.props}></EditDonor>
          <br></br>
          <br></br>
          <div ref={this.ref}>
          <DonationsList {...this.props}></DonationsList>
          </div>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DonorDetails);
