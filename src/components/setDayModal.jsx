import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";

class SetDayModal extends Component{

    constructor(){
        super();
        this.state = {
            day: "All"
        }
    }

    updateDay = (e) => {
        const {value} = e.target;
        this.setState({
            day: value
        });
        this.props.setDay(value);
    }

    render(){
        if(!this.props.show){
            return <div></div>;
        }
        return(
            <div className="modal">
                <h1>Set Day</h1>
                <label for="day">Select Day</label>
                <select value={this.state.day} onChange={(e) => this.updateDay(e)}>
                    <option>All</option>
                    <option>Mon</option>
                    <option>Tue</option>
                    <option>Wed</option>
                    <option>Thu</option>
                    <option>Fri</option>
                </select>
                <br />
                <button onClick={() => this.props.closeSetDayModal()}>Dismiss</button>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {setDayModal} = state.agenda;
    return{
        ...setDayModal
    }
}

export default connect(mapStateToProps, actions)(SetDayModal);