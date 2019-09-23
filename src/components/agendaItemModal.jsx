import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";
import { parseTime } from "../helpers/time";


const Week = (props) => {
    const {days} = props;
    const weekDays = [
        {
            day: "Sun",
            found: days.findIndex((e) => e == "Sun") != -1
        },
        {
            day: "Mon",
            found: days.findIndex((e) => e == "Mon") != -1
        },
        {
            day: "Tue",
            found: days.findIndex((e) => e == "Tue") != -1
        },
        {
            day: "Wed",
            found: days.findIndex((e) => e == "Wed") != -1
        },
        {
            day: "Thu",
            found: days.findIndex((e) => e == "Thu") != -1
        },
        {
            day: "Fri",
            found: days.findIndex((e) => e == "Fri") != -1
        },
        {
            day: "Sat",
            found: days.findIndex((e) => e == "Sat") != -1
        }
    ]
    return(
        <div className="week">
            {
                weekDays.map((d) => {
                    const {day, found} = d;
                    return(
                        <div className={"week__day"+(found ? " week__day-found" : "")}>
                            {day}
                        </div>
                    )
                })
            }
        </div>
    )
}

class AgendaItemModal extends Component {


    deleteItem = () => {
        this.props.deleteItem(this.props.id);
        this.props.closeAgendaModal();
    }

    render(){
        const {title, show, start, end, building, room, days} = this.props;
        if(!show) return <div></div>;
        return(
            <div className="modal">
                <h1>{title}</h1>
                <p>{`${parseTime(start)} - ${parseTime(end)}`}</p>
                <Week days={days}/>
                <p>{`${building} - ${room}`}</p>
                <button onClick={this.props.closeAgendaModal}>Dismiss</button>
                <button onClick={this.deleteItem}>Delete Item</button>
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