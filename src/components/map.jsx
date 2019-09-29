import React, {Component} from "react";
import mapboxgl, {NavigationControl, GeolocateControl} from "mapbox-gl";
import polyline from "@mapbox/polyline";
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
                "type": "symbol",
                "source": "agendaItems",
                "filter": ["==", "$type", "Point"],
                "layout": {
                    "text-field": [
                        "format",
                        ["get", "title"], {"font-scale": 1.5},
                        "\n", {},
                        ["get", "subtitle"], {"font-scale": 0.8}
                    ],
                    "icon-image": "college-15",
                    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                    "text-offset": [0, 0.6],
                    "text-anchor": "top"
                }
            });
            map.on('click', 'agenda-markers', (e) => {
                this.props.openAgendaModal(e.features[0].properties.id);
            });
            const {features} = this.props.items.data;
            for(let i = 0; i < features.length-1; i++){
                this.addRoute(i, features);
            }
        });
    }


    static addRoute = (index, features) => {
        console.log("My Index: ", features[index]);
        fetch('https://api.mapbox.com/directions/v5/mapbox/walking/'+features[index].coords[0]+'%2C'+features[index].coords[1]+'%3B'+features[index+1].coords[0]+'%2C'+features[index+1].coords[1]+'.json?access_token=pk.eyJ1IjoicHJldHR5Z29vZHN0dWRpb3MiLCJhIjoiY2pkamx4aTZlMWt4dDJwbnF5a3ZmbTEzcyJ9.lu_9eqO1kmUMPf9LXU80yg').then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            console.log("polyline", polyline.toGeoJSON(data.routes[0].geometry))
            map.addLayer({
                "id": "route"+index,
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {
                            "color": ["green", "yellow", "red"][index%3],
                            "order": index,
                            "offset": (index%3)*5
                        },
                        "geometry": polyline.toGeoJSON(data.routes[0].geometry)
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round",
                    "line-sort-key": ["get", "order"]
                },
                "paint": {
                    "line-color": ["get", "color"],
                    "line-width": 8,
                    "line-offset": ["get", "offset"]
                }
            });
        }).catch((e) => {
            console.log("Error: ", e);
        });
    }

    render(){
        return(
            <div id="agendaMap">

            </div>
        );
    }
}

let prevLayers = 0;

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
                id: e.id,
                title: e.title,
                subtitle: parseTime(e.start)+"-"+parseTime(e.end)
            }
        });
    });
    const layer = {
        type: "geojson",
        data: geoJSON
    }

    if(map.getSource && map.getSource('agendaItems')){
        map.getSource('agendaItems').setData(geoJSON);
    }

    for(let i = 0; i < prevLayers; i++){
        map.removeLayer("route"+i);
        map.removeSource("route"+i);
    }

    prevLayers = 0;

    for(let i = 0; i < state.agenda.todaysItems.length -1; i++){
        Map.addRoute(i, state.agenda.todaysItems);
        prevLayers++;
    }
    return{
        items: layer
    }
}

export default connect(mapStateToProps, actions)(Map);