
import React, { Component } from "react";
import { Provider } from 'react-redux';
import configureStore from '../store';
import routes from '../routes';
// import 'bootstrap/dist/css/bootstrap.css';

export default class Root extends Component {
render(){
  return (
	<Provider store={configureStore()}>
		{routes}
	</Provider>
);
  }
}




