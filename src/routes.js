import CreateDonor from "./containers/CreateDonor";
// import {Switch, IndexRoute } from "react-router";
import store from "./store.js";
import React from "react";
import App from "./containers/App";
import createHistory from "history/createBrowserHistory";
import DonationList from "./containers/DonationList";
import Navbar from './components/Navbar';
import { Donors } from "./containers/Donors";

import { Route, BrowserRouter, Switch} from "react-router-dom";

// import { Route } from "react-router";


const history = createHistory();

export default (
    <BrowserRouter history={history}>
        <Navbar />
        <Switch>
               <Route exact path="/" component={Donors} />
                <Route path="/donor/create" component={CreateDonor} />
                <Route path="/donors/:donorId/donations" render={(props)=> <DonationList {...props} />} />
                <Route path="/donors" component={Donors} />
            {/* </Route> */}
        </Switch>
    </BrowserRouter>
);
