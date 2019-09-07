import {GET_AGENDA} from "./actions";
import localforage from "localforage";

export function getAgenda(){
    return{
        type: GET_AGENDA,
        payload: {}
    }
}

export function addItem({title, days, start, end, building, room}){
    localforage.setItem('somekey', 'some value').then(function (value) {
        // Do other things once the value has been saved.
        console.log(value);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
}