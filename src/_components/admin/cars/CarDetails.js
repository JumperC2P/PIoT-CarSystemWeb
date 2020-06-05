import React, { Component } from 'react'
import Popup from "reactjs-popup";
import '../../styles/CarDetails.css';
import { connect } from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap';
import $ from "jquery";
import { alertActions, carActions } from '../../../_action';
 
import "react-datepicker/dist/react-datepicker.css";


class CarDetails extends Component{

    constructor(props){
        super(props);
        this.state = {
            car : this.props.car
        }
    }

    
    updateCar = async(close) => {
        let make = $('select#make option:checked')[0].id.split('-')[0];
        let new_car = {
            car_id: this.state.car.car_id,
            cost: this.state.car.cost,
            body_type: this.state.car.body_type,
            color: this.state.car.color,
            seat_number: this.state.car.seat_number,
            car_location: this.state.car.car_location,
            make: make
        }
        if (this.validate()){
            var result = await carActions.updateCar(this.props.user.username, this.props.user.password, new_car);
            if (result === true){
                alertActions.show_success("The car is updated", "", true, 0, ()=>{
                    close();
                });
            }else{
                alertActions.show_error("Failed to update the car", "", null);
            }
        }
    }

    validate = ()=> {
        let isValid = true;
        if (!this.state.car.cost ||this.state.car.cost.length === 0){
            alertActions.show_error("Uncompleted Information", "Please check 'cost per hour'.", null);
            isValid = false;
        }else if (!this.state.car.cost ||this.state.car.cost <= 0){
            alertActions.show_error("Uncompleted Information", "'cost per hour' must be greater than 0.", null);
            isValid = false;
        }else if (!this.state.car.body_type ||this.state.car.body_type.length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'car body type'.", null);
            isValid = false;
        }else if (!this.state.car.color ||this.state.car.color.length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'car color'.", null);
            isValid = false;
        }else if (!this.state.car.seat_number ||this.state.car.seat_number.length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'seat number'.", null);
            isValid = false;
        }else if (!this.state.car.car_location ||this.state.car.car_location.length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'car location'.", null);
            isValid = false;
        }

        return isValid;
    }


    removeCar = async(close) => {
        alertActions.show_warning("Are you sure to remove the car?", "Car ID: "+this.state.car.car_id, "Yes, remove it.", true, 0, async (isConfirm)=>{
            if (isConfirm.value){
                let result = await carActions.removeCar(this.props.user.username, this.props.user.password, this.state.car.car_id)
                if (result === true){
                    alertActions.show_success("You have removed the car.", "", true, 0, ()=>{
                        this.props.parent.onSearch();
                        close();
                    });
                }else{
                    alertActions.show_error("Failed to remove the car", "", null);
                }
            }
        }, null)
    }

    closePopup = () => {
        this.props.parent.onSearch();
    }
    
    onInputChange = (e, symbol) => {
        this.setState({
            car: {
                car_id: this.state.car.car_id,
                cost: symbol==='cost'?e.target.value:this.state.car.cost,
                make: symbol==='make'?e.target.value:this.state.car.make,
                body_type: symbol==='body_type'?e.target.value:this.state.car.body_type,
                color: symbol==='color'?e.target.value:this.state.car.color,
                seat_number: symbol==='seat_number'?e.target.value:this.state.car.seat_number,
                car_location: symbol==='car_location'?e.target.value:this.state.car.car_location,
            }
        });
    }

    render(){
        return(
            <div>
                <Popup trigger={<Button variant="success">Details</Button>}
                    modal
                    closeOnDocumentClick
                    style={{"border-radius": "18px"}}
                    onClose = {this.closePopup}
                >
                    {(close)=>(
                            <div id="pop_model">
                                <a id="pop_close" onClick={close}>
                                    &times;
                                </a>
                                <div id="pop_header" style={{}}> 
                                    <span>   
                                        Car Details - ID: {this.state.car.car_id} 
                                    </span>
                                </div>
                                <div id="pop_content">
                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} md="4" controlId="car_id">
                                                <Form.Label>Car ID:</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.state.car.car_id} 
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="cost">
                                                <Form.Label>Cost per Hour: </Form.Label>
                                                <Form.Control 
                                                    type="number" 
                                                    value={this.state.car.cost} 
                                                    onChange={(e)=> this.onInputChange(e, 'cost')}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="make">
                                                <Form.Label>Manufacturer: </Form.Label>
                                                <Form.Control as="select" custom="true">
                                                    { 
                                                        this.props.makes.map((option) => 
                                                        <option id={`${option.id}-${option.name}`} className="select list" value={option}>{option.name}</option>)
                                                    }
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="4" controlId="body_type">
                                                <Form.Label>Car Type:</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.state.car.body_type} 
                                                    onChange={(e)=> this.onInputChange(e, 'body_type')}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="color">
                                                <Form.Label>Color: </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.state.car.color} 
                                                    onChange={(e)=> this.onInputChange(e, 'color')}
                                                    
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="seat_number">
                                                <Form.Label>Seat Numbers: </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.state.car.seat_number} 
                                                    onChange={(e)=> this.onInputChange(e, 'seat_number')}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="12" controlId="car_location">
                                                <Form.Label>Car Location:</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.state.car.car_location} 
                                                    onChange={(e)=> this.onInputChange(e, 'car_location')}
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </div>
                                <div id="pop_footer">
                                    <Button className="menu-button" variant="success" type="button" onClick={()=> this.updateCar(close)}>
                                        Update
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button className="menu-button" variant="danger" type="button" onClick={()=> this.removeCar(close)}>
                                        Remove
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button className="menu-button" variant="light" type="button" onClick={close}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                    )}
                </Popup>

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps)(CarDetails);