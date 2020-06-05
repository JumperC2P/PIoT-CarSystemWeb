import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import '../../styles/CarManagement.css';
import { Redirect } from 'react-router-dom';
import CarSearch from './CarSearch';
import {Form, Button, Col} from 'react-bootstrap';
import Popup from "reactjs-popup";
import $ from "jquery";
import { alertActions, carActions, commonActions } from '../../../_action';

const AddCar = (props) => {
    const [car, setCar] = useState()
    
    const addCar = async (close) => {
        let make = $('select#make option:checked')[0].id.split('-')[0];
        let new_car = {
            cost: $('#cost').val(),
            body_type: $('#body_type').val(),
            color: $('#color').val(),
            seat_number: $('#seat_number').val(),
            car_location: $('#car_location').val(),
            make: make
        }
        if (validate()){
            var result = await carActions.addCar(props.user.username, props.user.password, new_car);
            if (result === true){
                alertActions.show_success("The car is added", "", true, 0, ()=>{
                    close();
                });
            }else{
                alertActions.show_error("Failed to add the car", "", null);
            }
        }
    }

    const onInputChange = (e, symbol) => {
        let new_car = {
            cost: $('#cost').val(),
            body_type: $('#body_type').val(),
            color: $('#color').val(),
            seat_number: $('#seat_number').val(),
            car_location: $('#car_location').val(),
        }

        setCar(new_car);
    }

    const validate = ()=> {
        let isValid = true;
        if ($('#cost').val().length === 0){
            alertActions.show_error("Uncompleted Information", "Please check 'cost per hour'.", null);
            isValid = false;
        }else if ($('#cost').val() <= 0){
            alertActions.show_error("Uncompleted Information", "'cost per hour' must be greater than 0.", null);
            isValid = false;
        }else if ($('#body_type').val().length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'car body type'.", null);
            isValid = false;
        }else if ($('#color').val().length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'car color'.", null);
            isValid = false;
        }else if ($('#seat_number').val().length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'seat number'.", null);
            isValid = false;
        }else if ($('#car_location').val().length === 0){
            alertActions.show_error("Uncompleted Information", "Please enter 'car location'.", null);
            isValid = false;
        }

        return isValid;
    }

    return(
        <div>
            <Popup trigger={<Button variant="outline-danger">Add Car</Button>}
                modal
                closeOnDocumentClick
                style={{"border-radius": "18px"}}
            >
                {(close)=>(
                        <div id="pop_model">
                            <a id="pop_close" onClick={close}>
                                &times;
                            </a>
                            <div id="pop_header" style={{}}> 
                                <span>   
                                    Add a new car
                                </span>
                            </div>
                            <div id="pop_content">
                                <Form>
                                    <Form.Row>
                                         <Form.Group as={Col} md="6" controlId="body_type">
                                            <Form.Label>Car Type:</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                onChange={(e)=> onInputChange(e, 'body_type')}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="make">
                                            <Form.Label>Manufacturer: </Form.Label>
                                            <Form.Control as="select" custom="true">
                                                { 
                                                    props.make.map((option) => 
                                                    <option id={`${option.id}-${option.name}`} className="select list" value={option}>{option.name}</option>)
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="4" controlId="cost">
                                            <Form.Label>Cost per Hour: </Form.Label>
                                            <Form.Control 
                                                type="number" 
                                                onChange={(e)=> onInputChange(e, 'cost')}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="color">
                                            <Form.Label>Color: </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                onChange={(e)=> onInputChange(e, 'color')}
                                                
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md="4" controlId="seat_number">
                                            <Form.Label>Seat Numbers: </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                onChange={(e)=> onInputChange(e, 'seat_number')}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col} md="12" controlId="car_location">
                                            <Form.Label>Car Location:</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                onChange={(e)=> onInputChange(e, 'car_location')}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </div>
                            <div id="pop_footer">
                                <Button className="menu-button" variant="success" type="button" onClick={()=> addCar(close)}>
                                    Add
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

class CarManagment extends Component{

    constructor(props){
        super(props);
        this.state = {
            makes : []
        }

        this.getParameters = this.getParameters.bind(this);
    }

    componentDidMount(){
        this.getParameters();
    }

    getParameters = async() => {
        let makesP = await commonActions.getMakes(this.props.user.username, this.props.user.password);

        this.setState({
            makes: makesP
        });
    }

    render(){

        if (!this.props.user){
            return <Redirect to="login" />
        }

        return(
            <div className="content">
                <div className="home wrap">
                    <h1 className="ui home">Car Management</h1>
                </div>
                <div id="search-bar">
                    <AddCar {...this.props} make={this.state.makes}/>
                </div>
                <CarSearch {...this.props}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(CarManagment);