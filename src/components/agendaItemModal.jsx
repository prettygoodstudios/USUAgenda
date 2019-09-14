import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";
import { parseTime } from "../helpers/time";

class AgendaItemModal extends Component {
    render(){
        const {title, show, start, end, building, room, days} = this.props;
        if(!show) return <div></div>;
        return(
            <div className="modal">
                <h1>{title}</h1>
                <p>{`${parseTime(start)} - ${parseTime(end)}`}</p>
                <p>{days}</p>
                <p>{`${building} - ${room}`}</p>
                <button onClick={this.props.closeAgendaModal}>Dismiss</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    const {agendaItemModal}= state.agenda;
    return{
        ...agendaItemModal,
        ...state.agenda.items[agendaItemModal.id]
    }
}

export default connect(mapStateToProps, actions)(AgendaItemModal);