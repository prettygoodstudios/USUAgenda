import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";
import {parseTime} from "../helpers/time";

const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

class Header extends Component {

    constructor(){
        super();
        this.state = {
            openMenu: false,
            menuItems: [
                
            ]
        }
    }

    componentDidMount(){
        window.addEventListener("click", (e) => this.handleCloseClick(e));
        this.setState({
            menuItems: [
                {
                    title: "Add Agenda Item",
                    action: () => this.props.openNewItemModal()
                },
                {
                    title: "Set Day",
                    action: () => this.props.openSetDayModal()
                }
            ]
        })
    }

    handleCloseClick = (e) => {
        if(this.state.openMenu && e.target.className != "header__toggle open-menu-toggle" &&  e.target.className != "header__menu header__menu-open" && e.target.id != "toggleSpan"){
            this.setState({
                openMenu: false
            });
        }
    }

    toggleMenu = () => {
        this.setState({
            openMenu: !this.state.openMenu
        });
    }

    render(){
        let agendaItems = this.props.items.map((a, i) => {
           return {...a};
        });
        

        agendaItems.sort((a, b) => {
            return parseInt(a.start.split(":")[0])-parseInt(b.start.split(":")[0]);
        });
        return(
            <div className="header">
                <div className={"header__toggle"+(this.state.openMenu ? " open-menu-toggle" : "")} onClick={this.toggleMenu}>
                    <span id="toggleSpan"></span>
                    <span id="toggleSpan"></span>   
                    <span id="toggleSpan"></span>
                </div>
                <h1>Agenda</h1>
                <div className={"header__menu"+(this.state.openMenu ? " header__menu-open" : "")}>
                    {
                        agendaItems.map((m, i) => {
                            return <div className="header__menu__item" key={i} onClick={() => this.props.openAgendaModal(m.id)}>{m.title}<span>{`${parseTime(m.start)} - ${parseTime(m.end)}`}</span></div>
                        })
                    }
                    {
                        this.state.menuItems.map((m, i) => {
                            return <div className="header__menu__item" onClick={m.action} key={i}>{m.title}</div>
                        })
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        items: state.agenda.todaysItems,
        day: state.agenda.day
    }
}

export default connect(mapStateToProps, actions)(Header);