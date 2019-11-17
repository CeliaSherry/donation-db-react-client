
import React, { Component } from "react";
import { Provider } from 'react-redux';
import configureStore from '../store';
import routes from '../routes';

export default class Root extends Component {
render(){
  return (
	<Provider store={configureStore()}>
		{routes}
	</Provider>
);
  }
}




