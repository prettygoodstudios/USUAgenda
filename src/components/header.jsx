import React, {Component} from "react";


export default class Header extends Component {

    constructor(){
        super();
        this.state = {
            openMenu: false
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
                    <span></span>
                    <span></span>   
                    <span></span>
                </div>
                <h1>Agenda</h1>
            </div>
        );
    }
}