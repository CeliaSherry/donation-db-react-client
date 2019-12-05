
import CreateDonor from "./containers/CreateDonor";
import CreateContact from "./containers/CreateContact"
import CreateDonation from "./containers/CreateDonation"
import EditDonor from "./containers/EditDonor"
import EditDonation from "./containers/EditDonation"
// import {Switch, IndexRoute } from "react-router";
import CreateInstitution from "./containers/CreateInstitution";
import React from "react";
import createHistory from "history/createBrowserHistory";
import DonationList from "./containers/DonationList";
import Navbar from './components/Navbar';
import { Donors } from "./containers/Donors";
import SearchDonors from "./containers/SearchDonors";


import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Institution } from "./containers/Institutions";
import InstitutionContacts from "./containers/InstitutionContacts";
import { Contacts } from "./containers/Contacts";
import EditInstitution from "./containers/EditInstitution";
import EditContact from "./containers/EditContact";
import Home from "./containers/Home";


const history = createHistory();

export default (
    <BrowserRouter history={history} forceRefresh={true}>
        <Navbar />
        <Switch>
               <Route exact path="/" component={Home} />
                <Route path="/donor/create" component={CreateDonor} />
                <Route path="/donors/search" component={SearchDonors} />
                <Route path="/donor/:donorId/donation/create" component={CreateDonation} />
                <Route path={"/donor/:donorId/edit"} component={EditDonor} />
                <Route path={"/donation/:donationId/edit"} component={EditDonation} />
                <Route path={"/donor/:donorId/donations"} render={(props)=> <DonationList {...props} />} />
                <Route path="/donors:name?:email?:phone?:address?:city?:state?:zip?" component={Donors} />
                //institutions bit
                <Route exact path="/" component={Institution} />
                <Route path="/institutions/create" component={CreateInstitution} />
                <Route path={"/institutions/:institutionId/edit"} component={EditInstitution} />
                <Route path={`/institutions/:institutionId/contacts`} render={(props) => <InstitutionContacts {...props} />} />
                <Route path="/institutions" component={Institution} />
                //contacts
                <Route exact path="/" component={Contacts} />
                <Route path={"/contacts/:contactId/edit"} component={EditContact} />
                <Route path="/contacts/create" component={CreateContact} />
                <Route path="/contacts" component={Contacts} />
        </Switch>
    </BrowserRouter>
);
