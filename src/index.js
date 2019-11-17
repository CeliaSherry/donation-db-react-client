
import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from 'react-hot-loader';
import Root from "./containers/Root";
import 'bootstrap/dist/css/bootstrap.min.css';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
};

render(Root);