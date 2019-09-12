import React, {Component} from "react";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";
const store = createStore(rootReducer, compose(applyMiddleware(thunk), (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())) );

import Header from "./header.jsx";
import Map from "./map.jsx";
import NewItemModal from "./newItemModal.jsx";

export default class App extends Component {
   render(){
       return(
            <Provider store={store}>
                <div>
                    <Header />
                    <Map />
                    <NewItemModal />
                </div>
            </Provider>
       );
   }
}