import React, {Component} from "react";
import mapboxgl, {NavigationControl} from "mapbox-gl/dist/mapbox-gl.js";
import {connect} from "react-redux";

import * as actions from "../actions";
import { parseTime } from "../helpers/time";

mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHR5Z29vZHN0dWRpb3MiLCJhIjoiY2pkamx4aTZlMWt4dDJwbnF5a3ZmbTEzcyJ9.lu_9eqO1kmUMPf9LXU80yg';
let map = {};

class Map extends Component {
    constructor(){
        super();
        this.state = {
            map: {}
        }
    }

    componentDidMount(){
        this.props.getAgenda();
        map = new mapboxgl.Map({
            container: 'agendaMap',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-111.8097, 41.7452],
            zoom: 13.5
        });
        const nav = new NavigationControl({
            showCompass: true,
            showZoom: true
        });
        map.addControl(nav, 'top-right');
        let marker;
        let popup;
        this.props.items.forEach((e) => {
            marker = new mapboxgl.Marker();
            marker.setLngLat(e.coords)
            marker.addTo(map);
            popup = new mapboxgl.Popup({

            });
            popup.setHTML(
                `
                 <div>
                    <h1>${e.title}</h1>
                    <p>${e.building} - ${e.room}</p>
                    <p>Days: ${e.days.join(" ")}</p>
                    <p>${parseTime(e.start)} - ${parseTime(e.end)}</p>
                 </div>
                `
            );
            marker.setPopup(popup);
        });
    }


    addNavigation = () => {
        
    }

    addMarkers = () => {

    }

    render(){
        return(
            <div id="agendaMap">

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        items: state.agenda.items
    }
}

export default connect(mapStateToProps, actions)(Map);