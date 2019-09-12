import React from "react";
import ReactDOM from "react-dom";

import styles from "./styles/main.css";
import headerStyles from "./styles/header.css";
import mapboxStyles from 'mapbox-gl/dist/mapbox-gl.css';
import newItemModalStyles from './styles/newItemModal.css';

import App from "./components/app.jsx";

const appWrapper = document.getElementById("appWrapper");
ReactDOM.render(<App />, appWrapper);
