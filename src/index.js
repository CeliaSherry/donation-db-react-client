
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import configureStore from './store';
import Root from "./containers/Root";
import routes from './routes.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';

// ReactDOM.render(
// 	<Provider store={configureStore()}>
// 		{routes}
// 	</Provider>,
// 	document.getElementById("root")
// );


const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);