import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { carActions, alertActions } from '../_action';
import './styles/ShowRecordsHistory.css';
import DataTable from 'react-data-table-component';
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import subHours from 'date-fns/subHours';

const pageOptions = [10];

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

class ShowRecordsHistory extends Component{

    constructor(props){
        super(props);
        this.state = {
            records: [],
            loading: true,
            columns : [
                { name: 'Car ID', selector: 'car_id', sortable: true, center: true },
                { name: 'Manufacturer', selector: 'make', sortable: true, center: true },
                { name: 'Body Type', selector: 'body_type', sortable: true, center: true },
                { name: 'Color', selector: 'color', sortable: true, center: true },
                { name: 'Seats Number', selector: 'seat_number', sortable: false, center: true },
                { name: 'From', selector: 'est_rent_date', sortable: true, center: true, 
                    // cell: (row) => { return row.est_rent_date}
                    cell: (row) => { return format(subHours(new Date(row.est_rent_date), 10), "dd/MM/yyyy HH:mm:ss", 'en-AU')}
                },
                { name: 'To', selector: 'est_return_date', sortable: true, center: true, 
                    // cell: (row) => { return row.est_return_date }
                    cell: (row) => { return format(subHours(new Date(row.est_return_date), 10), "dd/MM/yyyy HH:mm:ss", 'en-AU')} 
                },
                { name: 'Cost', selector: 'cost', sortable: true, center: true,
                    cell:  (row) => {
                        var diff = differenceInDays(
                            new Date(row.est_return_date),
                            new Date(row.est_rent_date)
                        )
                        if (diff === 0){
                            return row.cost;
                        }else{
                            return Number.parseFloat(diff * row.cost).toFixed(2);
                        }
                        
                    }
                },
                {
                    cell: (row) => {
                           console.log(row);
			    return row.is_return !== 1?
                                    (row.is_cancel !== 1 ?
                                        (row.car_status === 'Booked'?<Button variant="danger" style={{"cursor":"pointer"}} onClick={()=>{this.cancelBooking(row)}}>Cancel</Button>
                                        :<Button variant="info" disabled style={{"cursor":"not-allowed"}} >Rented</Button>):
					<Button variant="info" disabled style={{"cursor":"not-allowed"}} >Canceled</Button>
                                    ):
                            <Button variant="success" disabled style={{"cursor":"not-allowed"}} >Completed</Button>
                    },
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    center: true
                  },
            ]
        }
        this.getHistorys = this.getHistorys.bind(this);
    }

    componentDidMount(){
        this.getHistorys();
    }

    getHistorys = async () => {
        this.setState({
            records: [],
            loading: true 
        })
        let records = await carActions.getRecords(this.props.user.username, this.props.user.password);
        if ( records.length != 0){
            this.setState({
                records: records,
                loading: false 
            })
        }else{
            alertActions.show_info("You haven't rented or booked a car yet.", "Go to book a car first.", ()=>{this.props.history.push("/")});
        }
    }

    cancelBooking = async (row) => {
        //title, message, confirm_btn_text, showConfirmButton, timer, confirm_func, cancel_func
        alertActions.show_warning("Are you sure to cancel the booking?", "", "Yes, cancel it.", true, 0, async ()=>{
            let result = await carActions.cancelBooking(this.props.user.username, this.props.user.password, row)
            if (result.code == 0){
                alertActions.show_success(result.message, "You can book another car now.", true, 0, ()=>{this.getHistorys()});
            }else{
                console.log(result);
                alertActions.show_error(result.message, "", null)
            }
        }, null)
    }

    render(){
        return (
            <div className="content">
                <div className="home wrap">
                    <h1 className="ui home"> {this.props.user.first_name}'s Rental History.</h1>
                </div>
                <div>
                    {
                        this.state.records.length != 0 ?
                            <div id="table-responsive">
                                <DataTable
                                    columns={this.state.columns}
                                    data={this.state.records}
                                    pagination
                                    progressPending = {this.state.loading}
                                    paginationRowsPerPageOptions={pageOptions}
                                    highlightOnHover
                                    customStyles={customStyles}
                                />
                            </div>:<div></div>
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user
    }
}

export default connect(mapStateToProps)(ShowRecordsHistory);
