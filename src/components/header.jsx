import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";


class Header extends Component {

    constructor(){
        super();
        this.state = {
            openMenu: false,
            menuItems: [
                {
                    title: "Add Agenda Item",
                    action: () => alert("Not Built Yet")
                }
            ]
        }
    }

    componentDidMount(){
        window.addEventListener("click", (e) => this.handleCloseClick(e));
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
                        this.props.items.map((m, i) => {
                            return <div className="header__menu__item" key={i}>{m.title}</div>
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
        items: state.agenda.items
    }
}

export default connect(mapStateToProps, actions)(Header);