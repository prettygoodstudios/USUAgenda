import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from "../actions";

import Error from "./error.jsx";

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
                    label: "Room",
                    id: "Room",
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
                    type: "time",
                    value: ""
                },
                {
                    label: "End",
                    id: "end",
                    type: "time",
                    value: ""
                }
            ],
            error: ""
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
        tmpInputs[3].value.forEach((day, i) => {
            if(day == id){
                found = i;
            }
        });
        if(found != -1){
            tmpInputs[3].value.splice(found, 1);
        }else{
            tmpInputs[3].value.push(id);
        }
        console.log(tmpInputs[3].value);
        this.setState({
            inputs: tmpInputs
        });
    }

    submitForm = () => {
        const {inputs} = this.state; 
        const data = {
            title: inputs[0].value,
            building: inputs[1].value,
            room: inputs[2].value,
            days: inputs[3].value,
            start: inputs[4].value,
            end: inputs[5].value
        }
        if(data.title != "" && data.building != "" && data.days != "" && data.start != "" && data.end != "" && data.room != ""){
            this.props.addItem(data);
            this.props.closeNewItemModal();
            this.setState({
                error: "",
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
                        label: "Room",
                        id: "room",
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
                        type: "time",
                        value: ""
                    },
                    {
                        label: "End",
                        id: "end",
                        type: "time",
                        value: ""
                    }
                ]
            });
        }else{
            this.setState({
                error: "You must completly fill out the form."
            });
        }
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
                <Error error={this.state.error} />
                <button onClick={this.submitForm}>Add Item</button>
                <button onClick={this.props.closeNewItemModal}>Cancel</button>
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