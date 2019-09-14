import {GET_AGENDA, TOGGLE_NEW_ITEM_MODAL, TOGGLE_SET_DAY_MODAL, SET_DAY, OPEN_AGENDA_MODAL, CLOSE_AGENDA_MODAL} from "./actions";
import { OCD_KEY } from "../env";

import localforage from "localforage";
import opencage from "opencage-api-client";


export function getAgenda(){
    return function(dispatch){
        getAgendaData().then((data) => {
            dispatch({
                type: GET_AGENDA,
                payload: data ? data : []
            });
        });
    }
}

function getAgendaData(){
    return localforage.getItem('agenda');
}

export function addItem({title, days, start, end, building, room}){
    return function(dispatch){
        getAgendaData().then((agenda) => {
            const newAgenda = agenda ? agenda : [];
            opencage.geocode({q: building+", Logan, Utah", key: OCD_KEY}).then(data => {
                if (data.status.code == 200) {
                  if (data.results.length > 0) {
                    var place = data.results[0];
                    //console.log(place.formatted);
                    //console.log(place.geometry);
                    //console.log(place.annotations.timezone.name);
                    newAgenda.push({
                        title,
                        days, 
                        start, 
                        end, 
                        building,
                        room,
                        coords: [place.geometry.lng, place.geometry.lat]
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
                  }
                } else if (data.status.code == 402) {
                  console.log('hit free-trial daily limit');
                  console.log('become a customer: https://opencagedata.com/pricing'); 
                } else {
                  // other possible response codes:
                  // https://opencagedata.com/api#codes
                  console.log('error', data.status.message);
                }
              }).catch(error => {
                console.log('error', error.message);
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

export function openSetDayModal(){
    return{
        type: TOGGLE_SET_DAY_MODAL,
        payload: true
    }
}

export function closeSetDayModal(){
    return{
        type: TOGGLE_SET_DAY_MODAL,
        payload: false
    }
}

export function setDay(day){
    return{
        type: SET_DAY, 
        payload: day
    }
}

export function openAgendaModal(index){
    return{
        type: OPEN_AGENDA_MODAL,
        payload: index
    }
}

export function closeAgendaModal(){
    return{
        type: CLOSE_AGENDA_MODAL,
        payload: {}
    }
}