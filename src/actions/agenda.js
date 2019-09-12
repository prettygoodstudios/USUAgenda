import {GET_AGENDA, TOGGLE_NEW_ITEM_MODAL} from "./actions";
import localforage from "localforage";

export function getAgenda(){
    return function(dispatch){
        getAgendaData().then((data) => {
            dispatch({
                type: GET_AGENDA,
                payload: GET_AGENDA
            });
        });
    }
}

function getAgendaData(){
    return localforage.getAgenda('agenda');
}

export function addItem({title, days, start, end, building, room}){
    return function(dispatch){
        getAgendaData().then((agenda) => {
            const newAgenda = agenda ? agenda : [];
            newAgenda.push({
                title,
                days, 
                start, 
                end, 
                building,
                room
            });
            localforage.setItem('agenda', newAgenda).then(function (value) {
                // Do other things once the value has been saved.
                dispatch({
                    type: GET_AGENDA,
                    payload: newAgenda
                });
            }).catch(function(err) {
                // This code runs if there were any errors
                console.log(err);
            });
        });
    };
}

export function openNewItemModal(){
    return{
        type: TOGGLE_NEW_ITEM_MODAL,
        payload: true
    }
}

export function closeNewItemModal(){
    return{
        type: TOGGLE_NEW_ITEM_MODAL,
        payload: false
    }
}