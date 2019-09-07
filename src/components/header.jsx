import React, {Component} from "react";


export default class Header extends Component {

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
        if(this.state.openMenu && e.target.className != "header__toggle open-menu-toggle" &&  e.target.className != "header__menu header__menu-open"){
            console.log(e.target.className);
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
                    <span></span>
                    <span></span>   
                    <span></span>
                </div>
                <h1>Agenda</h1>
                <div className={"header__menu"+(this.state.openMenu ? " header__menu-open" : "")}>
                    {
                        this.state.menuItems.map((m, i) => {
                            return <div className="header__menu__item" onClick={m.action}>{m.title}</div>
                        })
                    }
                </div>
            </div>
        );
    }
}