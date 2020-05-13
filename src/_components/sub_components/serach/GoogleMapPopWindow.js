import React, { Component } from 'react'
import Popup from "reactjs-popup";
import GoogleMapIcon from '../../../_images/google-maps.png'
import '../../styles/GoogleMapPopWindow.css';
import {Button} from 'react-bootstrap';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 

const containerStyle = {
    position: 'relative',  
    width: '100%',
    height: '100%',
    "zIndex": 999,
  }


class GoogleMapPopWindow extends Component{

    constructor(props){
        super(props);

        this.state = {
            zoom: 15,
            center:{
                lat: this.props.car.car_location.split(",")[0], 
                lng: this.props.car.car_location.split(",")[1]
            }
        }

    }

    render(){
        return (
            <center>
                <Popup trigger={<img className="params_icon" src={GoogleMapIcon} style={{"cursor":"pointer"}}/>}
                    modal
                    closeOnDocumentClick
                >
                    {(close)=>(
                            <div id="pop_model">
                                <div id="pop_content">
                                    <div style={{width: '100%', height: '500px', overflow: "visible !important"}}>
                                    <Map 
                                        containerStyle={containerStyle} 
                                        google={this.props.google} 
                                        zoom={17}
                                        initialCenter={{
                                            lat: this.state.center.lat,
                                            lng: this.state.center.lng
                                        }}
                                    >
                                        <Marker onClick={this.onMarkerClick}
                                                name={'Here'} />
                                        <InfoWindow onClose={this.onInfoWindowClose}>
                                            <span>Car is here!</span>
                                        </InfoWindow>
                                    </Map>
                                    </div>
                                </div>
                            </div>
                    )}
                </Popup>
            </center>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAf3L_oXW9aZsf2h_2dWofMJ28InHjgLes"
  })(GoogleMapPopWindow)