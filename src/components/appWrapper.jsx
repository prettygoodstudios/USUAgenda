import React, {Component} from "react";
import {connect} from "react-redux";

import Header from "./header.jsx";
import Map from "./Map.jsx";
import NewItemModal from "./newItemModal.jsx";

import * as actions from "../actions";

class AppWrapper extends Component {

    componentDidMount(){
        console.log("Hello From AppWrapper Mount!");
        this.props.getAgenda();
    }

    render(){
        const {agenda} = this.props;
        return(
            <div>
                {agenda.items && (!agenda.items[0] || agenda.items[0].title != "CS 1440") && <Header /> }
                {agenda.items && (!agenda.items[0] || agenda.items[0].title != "CS 1440") && <Map /> }
                <NewItemModal />
            </div>
        )
    }
}

function mapStateToProps(state){
    const {agenda} = state;
    return{
        agenda
    }
}

export default connect(mapStateToProps, actions)(AppWrapper);