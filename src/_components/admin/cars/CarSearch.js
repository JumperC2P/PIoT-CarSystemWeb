import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap';
import { commonActions, carActions, alertActions, adminActions } from '../../../_action';
import '../../styles/CarSearch.css';
import DataTable from 'react-data-table-component';
import GoogleMapPopWindow from '../../customer/serach/GoogleMapPopWindow';
import CarDetails from './CarDetails';
import {CAR_STATUS} from '../../../_constants';
import Popup from "reactjs-popup";


const pageOptions = [10,25];

const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: '#202124',
        fontSize: '14px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'rgb(230, 244, 244)',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

const ReportWindow = (props) => {
    const [issue, setIssue] = useState("");


    const onReported = (close) => {
        alertActions.show_warning("Are you sure to report the car?", "Car ID: "+props.car.car_id, "Yes, report it.", true, 0, async (isConfirm)=>{
            if (isConfirm.value){
                let result = await adminActions.reportCar(props.user.username, props.user.password, props.car.car_id, props.user.user_id, issue)
                if (result === true){
                    alertActions.show_success("You have reported the car.", "", true, 0, ()=>{
                        props.parent.onSearch();
                        close();
                    });
                }else{
                    alertActions.show_error("Failed to report the car", "", null);
                }
            }
        }, null)
    } 

    const onInputChange = (e) => {
        setIssue(e.target.value);
    }

    return(
        <div>
            <Popup trigger={<Button variant="danger" style={{"cursor":"cursor"}}>Report</Button>}
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
                                    Report the car - Car ID: {props.car.car_id}
                                </span>
                            </div>
                            <div id="pop_content" className ="report_pop">
                                <Form>
                                    <Form.Row>
                                         <Form.Group as={Col} md="12" controlId="issue">
                                            <Form.Label>Issue:</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                onChange={(e)=> onInputChange(e)}
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                            </div>
                            <div id="pop_footer">
                                <Button className="menu-button" variant="success" type="button" onClick={()=>{onReported(close)}}>
                                    Submit
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
  

class CarSearch extends Component{

    constructor(props){
        super(props);
        this.state = {
            columns : [
                        { name: 'Car ID', selector: 'car_id', sortable: true, center: true },
                        { name: 'Cost per Hour', selector: 'cost', sortable: true, center: true },
                        { name: 'Manufacturer', selector: 'make', sortable: true, center: true },
                        { name: 'Body Type', selector: 'body_type', sortable: true, center: true },
                        { name: 'Color', selector: 'color', sortable: true, center: true },
                        { name: 'Seats Number', selector: 'seat_number', sortable: false, center: true },
                        { name: 'Status', selector: 'car_status', sortable: true, center: true },
                        { name: 'Location', selector: 'car_location', sortable: false, center: true, 
                            cell:  (row) => <GoogleMapPopWindow {...props} parent={this} car={row}/>
                        },
                        {
                            cell: (row) => {
                                return <CarDetails car={row} {...props} parent={this} makes={this.state.makes}/>
                            },
                            ignoreRowClick: true,
                            allowOverflow: true,
                            button: true,
                            center: true
                          },
                        {
                            cell: (row) => {
                                return row.car_status !== 'Reported'?<ReportWindow car={row} {...props} parent={this} />
                                    :
                                    <Button variant="secondary" disabled style={{"cursor":"not-allowed"}} >{row.car_status}</Button>
                            },
                            ignoreRowClick: true,
                            allowOverflow: true,
                            button: true,
                            center: true
                          },
                    ],
            status: [],
            makes: [],
            colors: [],
            body_types: [],
            seat_numbers: [],
            cars: [],
            loading: true
        }
        this.getParameters = this.getParameters.bind(this);
    }

    componentDidMount(){
        this.getParameters();
    }

    getParameters = async() => {
        let makesP = await commonActions.getMakes(this.props.user.username, this.props.user.password);
        let colorsP = await commonActions.getColors(this.props.user.username, this.props.user.password);
        let typesP = await commonActions.getBodyTypes(this.props.user.username, this.props.user.password);
        let seatsP = await commonActions.getSeatNumbers(this.props.user.username, this.props.user.password);

        makesP.map((option)=>{
            return option.isChecked = false
        })
        colorsP.map((option)=>{
            return option.isChecked = false
        })
        typesP.map((option)=>{
            return option.isChecked = false
        })
        seatsP.map((option)=>{
            return option.isChecked = false
        })

        this.setState({
            status: CAR_STATUS,
            makes: makesP,
            colors: colorsP,
            body_types: typesP,
            seat_numbers: seatsP
        });
    }

    selectOptions = async (target, action) =>{

        var target_arr;

        if (action === 'status'){
            target_arr = this.state.status;
            target_arr.map((option)=>{
                if (option.status === target.option.status){
                    option.isChecked = !option.isChecked
                }
            })
        }else if (action === 'make'){
            target_arr = this.state.makes;
            target_arr.map((option)=>{
                if (option.name === target.option.name){
                    option.isChecked = !option.isChecked
                }
            })
        }else if (action === 'color'){
            target_arr = this.state.colors;
            target_arr.map((option)=>{
                if (option.color === target.option.color){
                    option.isChecked = !option.isChecked
                }
            })
        }else if (action === 'seat'){
            target_arr = this.state.seat_numbers;
            target_arr.map((option)=>{
                if (option.seat_number === target.option.seat_number){
                    option.isChecked = !option.isChecked
                }
            })
        }else if (action === 'type'){
            target_arr = this.state.body_types;
            target_arr.map((option)=>{
                if (option.body_type === target.option.body_type){
                    option.isChecked = !option.isChecked
                }
            })
        }


        await this.setState({
            status: action === 'status'?target_arr:this.state.status,
            makes: action === 'make'?target_arr:this.state.makes,
            colors: action === 'color'?target_arr:this.state.colors,
            body_types: action === 'type'?target_arr:this.state.body_types,
            seat_numbers: action === 'seat'?target_arr:this.state.seat_numbers
        });
    } 

    onSearch = async () => {
        let search_paramters= {
            status: [],
            makes: [],
            colors: [],
            types: [],
            seats: []
        }

        this.state.status.map(option=>{
            if (option.isChecked){
                search_paramters.status.push(option.status)
            }
        })

        this.state.makes.map(option=>{
            if (option.isChecked){
                search_paramters.makes.push(option.name)
            }
        })

        this.state.colors.map(option=>{
            if (option.isChecked){
                search_paramters.colors.push(option.color)
            }
        })

        this.state.body_types.map(option=>{
            if (option.isChecked){
                search_paramters.types.push(option.body_type)
            }
        })

        this.state.seat_numbers.map(option=>{
            if (option.isChecked){
                search_paramters.seats.push(option.seat_number)
            }
        })

        let cars = await carActions.getCarsWithparams(this.props.user.username, this.props.user.password, search_paramters)
        if (cars.length !== 0){
            this.setState({
                cars: cars,
                loading: false
            });
        }else{
            alertActions.show_info("Cannot find the cars with your condition.", "", null)
        }
    }

    onClear = () => {
        let makesC = []
        this.state.makes.map(option=>{
            option.isChecked = false
            makesC.push(option)
        })
        
        let colorsC = []
        this.state.colors.map(option=>{
            option.isChecked = false
            colorsC.push(option)
        })
        
        let typesC = []
        this.state.body_types.map(option=>{
            option.isChecked = false
            typesC.push(option)
        })
        
        let seatsC = []
        this.state.seat_numbers.map(option=>{
            option.isChecked = false
            seatsC.push(option)
        })
        
        let statusC = []
        this.state.status.map(option=>{
            option.isChecked = false
            statusC.push(option)
        })

        this.setState({
            status: statusC,
            makes: makesC,
            colors: colorsC,
            body_types: typesC,
            seat_numbers: seatsC,
            cars: [],
            loading: true
        });
    }

    render(){
        return(
            <div>
                <div id = "search-bar">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="checkStatus">
                                <Form.Label md="4" className="search-label car">Status: </Form.Label>
                                {this.state.status.map((option)=>
                                    <Form.Check 
                                        key={option.status}
                                        inline 
                                        type="checkbox" 
                                        label={option.status} 
                                        value={option.status}
                                        onChange={()=>{this.selectOptions({option},'status')}} id={`make-${option.status}-1`}
                                        checked={option.isChecked}
                                    />
                                )}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="checkMake">
                                <Form.Label md="4" className="search-label car">Manufacturer: </Form.Label>
                                {this.state.makes.map((option)=>
                                    <Form.Check 
                                        key={option.id}
                                        inline 
                                        type="checkbox" 
                                        label={option.name} 
                                        value={option.id}
                                        onChange={()=>{this.selectOptions({option},'make')}} id={`make-${option.name}-1`}
                                        checked={option.isChecked}
                                    />
                                )}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="checkColor">
                            <Form.Label md="4" className="search-label car">Color: </Form.Label>
                                {this.state.colors.map((option)=>
                                    <Form.Check 
                                        key={option.color}
                                        inline 
                                        type="checkbox" 
                                        label={option.color} 
                                        value={option.color}
                                        onChange={()=>{this.selectOptions({option},'color')}} 
                                        id={`color-${option.color}-1`}
                                        checked={option.isChecked}
                                    />
                                )}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="checkType">
                                <Form.Label md="4" className="search-label car">Type: </Form.Label>
                                {this.state.body_types.map((option)=>
                                    <Form.Check 
                                        key={option.body_type}
                                        inline 
                                        type="checkbox" 
                                        label={option.body_type} 
                                        value={option.body_type} 
                                        onChange={()=>{this.selectOptions({option},'type')}} id={`type-${option.body_type}-1`}
                                        checked={option.isChecked}
                                    />
                                )}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="checkSeat">
                                <Form.Label md="4" className="search-label car">Seat Numbers: </Form.Label>
                                {this.state.seat_numbers.map((option)=>
                                    <Form.Check 
                                        key={option.seat_number}
                                        inline 
                                        type="checkbox" 
                                        label={option.seat_number} 
                                        value={option.seat_number} 
                                        onChange={()=>{this.selectOptions({option},'seat')}} id={`seat-${option.seat_number}-1`}
                                        checked={option.isChecked}
                                    />
                                )}
                            </Form.Group>
                        </Form.Row>

                        <Button variant="primary" type="button" onClick={this.onSearch}>
                            Search
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="secondary" type="button" onClick={this.onClear}>
                            Clear
                        </Button>
                    </Form>
                </div>
                {
                    this.state.cars.length != 0 ?
                        <div id="table-responsive">
                            <DataTable
                                title="Matched Cars:"
                                columns={this.state.columns}
                                data={this.state.cars}
                                pagination
                                progressPending = {this.state.loading}
                                paginationRowsPerPageOptions={pageOptions}
                                highlightOnHover
                                customStyles={customStyles}
                            />
                        </div>:<div></div>
                }
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps)(CarSearch);