import CreateDonor from "./containers/CreateDonor";
import { Router, Switch } from "react-router";
import store from "./store.js";
import React from "react";
import App from "./containers/App";
import createHistory from "history/createBrowserHistory";
import Donor from "./containers/Donors";
import DonorList from "./containers/DonorList";
import DonationList from "./containers/DonationList";
import Navbar from './components/Navbar';
import Donors from "./containers/Donors";


import { Route, IndexRoute } from "react-router";

import { BrowserRouter } from "react-router-dom";

const history = createHistory();

export default (
  <Router history={history}>
  <Navbar/>
        <Switch>
    <Route  path="/" component={App}>
     <Route path="/donor/create" exact component={CreateDonor} />
     <Route path="/donors" exact component={Donors} />
     <Route path="/donations" exact component={DonationList} />

      {/* <Route path="/donors/create" component={Donor} /> */}
      </Route>
      </Switch>
  </Router>
);
