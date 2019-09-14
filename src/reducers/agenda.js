import { GET_AGENDA, TOGGLE_NEW_ITEM_MODAL, TOGGLE_SET_DAY_MODAL, SET_DAY, OPEN_AGENDA_MODAL, CLOSE_AGENDA_MODAL } from "../actions/actions";

const days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
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

    },
    setDayModal: {
        show: false
    },
    day: days[new Date().getDay()],
    agendaItemModal: {
        show: false,
        id: -1
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
                },
                setDayModal: {
                    show: false
                },
                agendaItemModal: {
                    id: -1,
                    show: false
                }
            }
        case TOGGLE_SET_DAY_MODAL:
            return{
                ...state,
                setDayModal:{
                    show: action.payload
                },
                agendaItemModal: {
                    show: false,
                    id: -1
                },
                newItemModal: {
                    show: false
                }
            }
        case SET_DAY:
            return{
                ...state,
                day: action.payload
            }
        case OPEN_AGENDA_MODAL:
            return{
                ...state,
                agendaItemModal: {
                    show: true,
                    id: action.payload
                },
                setDayModal: {
                    show: false
                },
                newItemModal: {
                    show: false
                }
            }
        case CLOSE_AGENDA_MODAL: 
            return{
                ...state,
                agendaItemModal: {
                    show: false,
                    id: -1
                }
            }
        default:
            return{
                ...state
            }
    }
}