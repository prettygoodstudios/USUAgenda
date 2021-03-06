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
    },
    todaysItems: []
}

export default function(state = INIT_STATE, action){
    switch(action.type){
        case GET_AGENDA:
            const mappedItems = action.payload.map((item, i) => {
                return{
                    ...item,
                    id: i
                }
            });
            const initialTodaysItems = mappedItems.filter((i) => {
                let found = false;
                if(i.days.forEach){
                    i.days.forEach((d) => {
                        if(d == state.day || state.day == "All") found = true;
                    });
                }
                return found;
            });
            const todaysInitialSortedItems = initialTodaysItems.sort((a, b) => {
                return parseInt(a.start.split(":")[0])-parseInt(b.start.split(":")[0]);
            });
            return {
                ...state,
                items: action.payload,
                todaysItems: todaysInitialSortedItems
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
            const todaysMappedItems = state.items.map((item, i) => {
                return{
                    ...item,
                    id: i
                }
            });
            const todaysItems = todaysMappedItems.filter((i) => {
                let found = false;
                if(i.days.forEach){
                    i.days.forEach((d) => {
                        if(d == action.payload || action.payload == "All") found = true;
                    });
                }
                return found;
            });
            const todaysSortedItems = todaysItems.sort((a, b) => {
                return parseInt(a.start.split(":")[0])-parseInt(b.start.split(":")[0]);
            });
            return{
                ...state,
                day: action.payload,
                todaysItems: todaysSortedItems
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