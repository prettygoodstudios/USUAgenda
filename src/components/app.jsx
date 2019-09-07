import React, {Component} from "react";

import Header from "./header.jsx";

export default class App extends Component {
   render(){
       return(
            <div>
                <Header />
                <h1>Hello From App</h1>
            </div>
       );
   }
}