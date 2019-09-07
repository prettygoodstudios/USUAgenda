import React, {Component} from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";

import rootReducer from "../reducers";
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

import Header from "./header.jsx";
import Map from "./map.jsx";

export default class App extends Component {
   render(){
       return(
            <Provider store={store}>
                <div>
                    <Header />
                    <Map />
                    <h1>Hello From App</h1>
                </div>
            </Provider>
       );
   }
}