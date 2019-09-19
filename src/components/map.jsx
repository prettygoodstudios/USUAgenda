import React, {Component} from "react";
import mapboxgl, {NavigationControl, GeolocateControl} from "mapbox-gl/dist/mapbox-gl.js";
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
        map.addControl(new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
        map.on("load", () => {
            map.addSource("agendaItems", this.props.items);
            map.addLayer({
                "id": "agenda-markers",
                "type": "circle",
                "source": "agendaItems",
                "paint": {
                "circle-radius": 40,
                "circle-color": "#B42222"
                },
                "filter": ["==", "$type", "Point"],
                });
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
    const geoJSON = {
        type: 'FeatureCollection',
        features: []
    };
    state.agenda.todaysItems.forEach((e) => {
        geoJSON.features.push({
            type: 'Feature',
            geometry: {
                type: "Point",
                coordinates: e.coords
            },
            properties: {
                "title": "Mapbox SF",
                "icon": "harbor"
            }
        });
    });
    const layer = {
        type: "geojson",
        data: geoJSON
    }
    console.log(geoJSON)
    if(map.getSource && map.getSource('agendaItems')){
        console.log(map)
        map.getSource('agendaItems').setData(geoJSON);
    }
    return{
        items: layer
    }
}

export default connect(mapStateToProps, actions)(Map);