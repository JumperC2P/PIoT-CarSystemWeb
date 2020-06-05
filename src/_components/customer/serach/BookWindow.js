import React, { Component } from 'react'
import Popup from "reactjs-popup";
import '../../styles/BookWindow.css';
import { connect } from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { carActions, alertActions } from '../../../_action';
import addHours from 'date-fns/addHours';
 
import "react-datepicker/dist/react-datepicker.css";


class BookWindow extends Component{

    constructor(props){
        super(props);

        this.state = {
            start_date: "",
            end_date: ""
        }
        console.log(this.props.parent)
    }
    
    setStartDate = async (date) => {
        await this.setState({
            start_date: date,
            end_date: this.state.end_date
        })
    }
    
    setEndDate = async (date) => {
        await this.setState({
            start_date: this.state.start_date,
            end_date: date
        })
    }

    onBook = async(close) => {

        if (this.state.start_date < this.state.end_date){
            // check the user has rented or booked a car.
            let check = await carActions.checkRecord(this.props.user.username, this.props.user.password)
            if (check){
                console.log("ALLOW");
                var est_rent_date_UTF = new Date(this.state.start_date);
                var est_return_date_UTF = new Date(this.state.end_date);

                var est_rent_date_aus = addHours(est_rent_date_UTF, 10)
                var est_return_date_aus = addHours(est_return_date_UTF, 10)

                var est_rent_date_aus_t = new Date(est_rent_date_aus).toJSON();
                var est_return_date_aus_t = new Date(est_return_date_aus).toJSON();
                var est_rent_date_aus_f = est_rent_date_aus_t.slice(0,10)+' '+est_rent_date_aus_t.slice(11,19);
                var est_return_date_aus_f = est_return_date_aus_t.slice(0,10)+' '+est_return_date_aus_t.slice(11,19);

                let book_info = {
                    "car_id": this.props.car.car_id,
                    "est_rent_date": est_rent_date_aus_f, 
                    "est_return_date": est_return_date_aus_f, 
                }
                let book_result = await carActions.book(this.props.user.username, this.props.user.password, book_info);
                if (book_result.code == 0){
                    var event_url = carActions.getGoogleEventUrl(this.props.user.username, this.props.car, est_rent_date_UTF, est_return_date_UTF);
                    alertActions.show_success("Thank you for booking the car", "Click \"OK\" and you can add an event to your google calendar.", true, 0, ()=>{
                        window.open(event_url);
                        close();
                    })
                }else if (book_result.code == 1){
                    alertActions.show_error(book_result.message, "", close())
                }else{
                    alertActions.show_error("The book operation is failed with unknown reason.", "", close())
                }
            }else{
                alertActions.show_error("You booked or rented another car yet.", "If you want to book a new car, please cancel the old one first.", close())
            }

        }else{
            alertActions.show_error("The return date must be later that rent date.", "", null)
        }
    }

    closePopup = () => {
        this.props.parent.onSearch();
    }

    render(){
        return(
            <div>
                <Popup trigger={<Button variant="success">Book</Button>}
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
                                        Book a car
                                    </span>
                                </div>
                                <div id="pop_content">
                                    <Form>
                                        <Form.Row>
                                            <Form.Group as={Col} md="4" controlId="car_id">
                                                <Form.Label>Car ID:</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.props.car.car_id} 
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="cost">
                                                <Form.Label>Cost per Hour: </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.props.car.cost} 
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="make">
                                                <Form.Label>Manufacturer: </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.props.car.make} 
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="4" controlId="body_type">
                                                <Form.Label>Car Type:</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.props.car.body_type} 
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="color">
                                                <Form.Label>Color: </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.props.car.color} 
                                                    disabled
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} md="4" controlId="seat_number">
                                                <Form.Label>Seat Numbers: </Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    value={this.props.car.seat_number} 
                                                    disabled
                                                />
                                            </Form.Group>
                                        </Form.Row>
                                        <Form.Row>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>From:</Form.Label>
                                                <div style={{"width":"100%"}}>
                                                    <DatePicker
                                                        id="start_date"
                                                        selected={this.state.start_date}
                                                        onChange={date => this.setStartDate(date)}
                                                        locale="en-AU"
                                                        showTimeSelect
                                                        timeFormat="p"
                                                        timeIntervals={15}
                                                        dateFormat="Pp"
                                                        placeholderText="Click to select a date"
                                                        className="form-control"
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6">
                                                <Form.Label>To: </Form.Label>
                                                <div style={{"width":"100%"}}>
                                                    <DatePicker
                                                        id="end_date"
                                                        selected={this.state.end_date}
                                                        onChange={date => this.setEndDate(date)}
                                                        locale="en-AU"
                                                        showTimeSelect
                                                        timeFormat="p"
                                                        timeIntervals={15}
                                                        dateFormat="Pp"
                                                        placeholderText="Click to select a date"
                                                        className="form-control"
                                                        minDate={new Date()}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Form.Row>
                                    </Form>
                                </div>
                                <div id="pop_footer">
                                    <Button className="menu-button" variant="success" type="button" onClick={()=> this.onBook(close)}>
                                        Confirm
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button className="menu-button" variant="danger" type="button" onClick={close}>
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

export default connect(mapStateToProps)(BookWindow);