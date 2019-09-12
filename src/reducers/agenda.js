import { GET_AGENDA, TOGGLE_NEW_ITEM_MODAL } from "../actions/actions";

const INIT_STATE = {
    items: [
        {
            title: "CS 1440",
            building: "Old Main",
            room: "115",
            days: ["M","W","F"],
            start: "9:30 AM",
            end: "10:20 AM",
            coords: [-111.8097, 41.7452]
        }
    ],
    newItemModal: {
        show: false,

    }
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_AGENDA:
            return {
                ...state,
                items: action.payload
            }
        case TOGGLE_NEW_ITEM_MODAL:
            return {
                ...state,
                newItemModal: {
                    show: action.payload
                }
            }
        default:
            return{
                ...state
            }
    }
}