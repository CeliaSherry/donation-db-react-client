import CreateDonor from "./containers/CreateDonor";
import EditDonor from "./containers/EditDonor";
import CreateDonation from "./containers/CreateDonation";
import React from "react";
import createHistory from "history/createBrowserHistory";
import DonationList from "./containers/DonationList";
import Navbar from './components/Navbar';
import { Donors } from "./containers/Donors";
import { Route, BrowserRouter, Switch} from "react-router-dom";
import EditDonation from "./containers/EditDonation";


const history = createHistory();

export default (
    <BrowserRouter history={history}>
        <Navbar />
        <Switch>
               <Route exact path="/" component={Donors} />
                <Route path="/donor/create" component={CreateDonor} />
                <Route path="/donor/:donorId/donation/create" component={CreateDonation} />
                <Route path={"/donor/:donorId/edit"} component={EditDonor} />
                <Route path={"/donation/:donationId/edit"} component={EditDonation} />
                <Route path={"/donor/:donorId/donations"} render={(props)=> <DonationList {...props} />} />
                <Route path="/donors" component={Donors} />
        </Switch>
    </BrowserRouter>
);


