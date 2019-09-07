import React, {Component} from "react";
import mapboxgl, {NavigationControl} from "mapbox-gl/dist/mapbox-gl.js";

mapboxgl.accessToken = 'pk.eyJ1IjoicHJldHR5Z29vZHN0dWRpb3MiLCJhIjoiY2pkamx4aTZlMWt4dDJwbnF5a3ZmbTEzcyJ9.lu_9eqO1kmUMPf9LXU80yg';
export default class Map extends Component {
    constructor(){
        super();
        this.state = {
            map: {}
        }
    }

    componentDidMount(){
        this.setState({
            map: new mapboxgl.Map({
                container: 'agendaMap',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-111.8097, 41.7452],
                zoom: 13.5
            })
        });
        window.setTimeout(this.addNavigation, 1000);
    }


    addNavigation = () => {
        console.log("Hello");
        this.state.map.addControl(new NavigationControl());
    }

    render(){
        return(
            <div id="agendaMap">

            </div>
        );
    }
}