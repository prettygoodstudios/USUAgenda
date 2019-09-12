import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";

class NewItemModal extends Component {

    constructor(){
        super();
        this.state = {
            inputs: [
                {
                    label: "Title",
                    id: "title",
                    type: "text",
                    value: ""
                },
                {
                    label: "Building",
                    id: "building",
                    type: "text",
                    value: ""
                },
                {
                    label: "Days",
                    id: "room",
                    type: "checkbox",
                    options: [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri"
                    ],
                    value: []
                },
                {
                    label: "Start",
                    id: "start",
                    type: "date",
                    value: ""
                },
                {
                    label: "End",
                    id: "end",
                    type: "date",
                    value: ""
                }
            ]
        }
    }

    updateInput = (id, e) => {
        const {value} = e.target;
        let tmpInputs = this.state.inputs;
        tmpInputs.forEach((input, i) => {
            if(input.id == id){
                tmpInputs[i].value = value;
            }
        });
        this.setState({
            inputs: tmpInputs
        });
    }

    updateCheckBox = (id, e) => {
        const {value} = e.target;
        let tmpInputs = this.state.inputs;
        let found = -1;
        tmpInputs[2].value.forEach((day, i) => {
            if(day == id){
                found = i;
            }
        });
        if(found != -1){
            tmpInputs[2].value.splice(found, 1);
        }else{
            tmpInputs[2].value.push(id);
        }
        console.log(tmpInputs[2].value);
        this.setState({
            inputs: tmpInputs
        });
    }

    render(){
        if(!this.props.show){
            return <div></div>;
        }
        return(
            <div className="modal">
                <h1>Add An Agenda Item</h1>
                {
                    this.state.inputs.map((i) => {
                        const {label, id, type, value, options} = i;
                        if(options){
                            return(
                                <div>
                                    <label for={id}>{label}</label>
                                    <div className="new-agenda-item__checkboxes">
                                        {
                                            options.map((o) => {
                                                return(
                                                    <div>
                                                        <label for={o}>{o}</label>
                                                        <input type={type} name={o} id={o} onChange={(e) => this.updateCheckBox(o, e)}/>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            );
                        }else{
                            return(
                                <div>
                                    <label for={id}>{label}</label>
                                    <input type={type} name={id} id={id} onChange={(e) => this.updateInput(id, e)} value={value}/>
                                </div>
                            );
                        }
                    })
                }
            </div>
        )
    }
}

function mapPropsToState(state){
    const {agenda} = state;
    return{
        ...agenda.newItemModal
    }
}

export default connect(mapPropsToState, actions)(NewItemModal);