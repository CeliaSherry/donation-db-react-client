import CreateDonor from "./containers/CreateDonor";
import CreateContact from "./containers/CreateContact"
// import {Switch, IndexRoute } from "react-router";
import CreateInstitution from "./containers/CreateInstitution";
import React from "react";
import createHistory from "history/createBrowserHistory";
import DonationList from "./containers/DonationList";
import Navbar from './components/Navbar';
import { Donors } from "./containers/Donors";

import { Route, BrowserRouter, Switch} from "react-router-dom";
import { Institution } from "./containers/Institutions";
import InstitutionContacts  from "./containers/InstitutionContacts";

// import { Route } from "react-router";


const history = createHistory();

export default (
    <BrowserRouter history={history}>
        <Navbar />
        <Switch>
               <Route exact path="/" component={Donors} />
                <Route path="/donor/create" component={CreateDonor} />
                <Route path={`/donors/:donorId/donations`} render={(props)=> <DonationList {...props} />} />
                <Route path="/donors" component={Donors} />
                //institutions bit
                <Route exact path="/" component={Institution} />
                <Route path="/institutions/create" component={CreateInstitution} />
                <Route path={`/institutions/:institutionId/contacts`} render={(props)=> <InstitutionContacts {...props} />} />
                <Route path="/institutions" component={Institution} />
                //contacts
                <Route path="/contacts/create" component={CreateContact} />
        </Switch>
    </BrowserRouter>
);


