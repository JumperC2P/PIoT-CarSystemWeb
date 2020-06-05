import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/EngHome.css';
import { Redirect } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import format from 'date-fns/format'
import subHours from 'date-fns/subHours';
import GoogleMapPopWindow from '../customer/serach/GoogleMapPopWindow';
import { adminActions, alertActions } from '../../_action';

const pageOptions = [10, 25];

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

class EngHome extends Component{

    constructor(props){
        super(props);
        this.state = {
            columns : [
                { name: 'Report ID', selector: 'report_id', sortable: true, center: true },
                { name: 'Car ID', selector: 'car_id', sortable: true, center: true },
                { name: 'Report Date', selector: 'report_date', sortable: true, center: true,
                    cell: (row) => { return format(subHours(new Date(row.report_date), 10), "dd/MM/yyyy HH:mm:ss", 'en-AU')}
                },
                { name: 'Close Date', selector: 'close_date', sortable: true, center: true,
                    cell: (row) => { return row.close_date?format(subHours(new Date(row.close_date), 10), "dd/MM/yyyy HH:mm:ss", 'en-AU'):""} 
                },
                { name: 'Issue', selector: 'issue', sortable: true, center: true },
                { name: 'Reporter ID', selector: 'admin_id', sortable: true, center: true },
                { name: 'Engineer ID', selector: 'engineer_id', sortable: true, center: true },
                { name: 'Location', selector: 'car_location', sortable: false, center: true, 
                    cell:  (row) => <GoogleMapPopWindow car={row}/>
                },
                {
                    cell: (row) => {
                        return !row.close_date?
                            <Button variant="danger" style={{"cursor":"pointer"}} onClick={()=>this.onCloseReport(row)}>Finish</Button>:
                            <Button variant="success" disabled style={{"cursor":"pointer"}} >Over</Button>
                    },
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    center: true
                  },
            ],
            reports: [],
            loading: true
        }

        this.getReports = this.getReports.bind(this);
    }

    componentDidMount(){
        this.getReports();
    }

    getReports = async () => {
        this.setState({
            reports: [],
            loading: true 
        })
        let reports = await adminActions.getReports(this.props.user.username, this.props.user.password);
        if ( reports.length != 0){
            this.setState({
                reports: reports,
                loading: false 
            })
        }
    }

    onCloseReport = (report) => {
        console.log(report);
        alertActions.show_warning("Has the car been maintained?", "Car ID: "+report.car_id + ", Report ID: " + report.report_id, "Yes, close it.", true, 0, async (isConfirm)=>{
            if (isConfirm.value){
                let result = await adminActions.closeReport(this.props.user.username, this.props.user.password, report.report_id, report.car_id, this.props.user.user_id)
                if (result === true){
                    alertActions.show_success("You have closed the report.", "", true, 0, ()=>{
                        this.getReports();
                    });
                }else{
                    alertActions.show_error("Failed to close the report", "", null);
                }
            }
        }, null)



    }

    render(){

        if (!this.props.user){
            return <Redirect to="login" />
        }

        return(
            <div className="content">
                <div className="home wrap">
                    <h1 className="ui home">Hi, {this.props.user.first_name}, Cars below need to be maintained.</h1>
                </div>
                <div>
                    {
                        this.state.reports.length != 0 ?
                            <div id="table-responsive">
                                <DataTable
                                    columns={this.state.columns}
                                    data={this.state.reports}
                                    pagination
                                    progressPending = {this.state.loading}
                                    paginationRowsPerPageOptions={pageOptions}
                                    highlightOnHover
                                    customStyles={customStyles}
                                />
                            </div>:<center><h2>All cars are good.</h2></center>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ 
    user: state.authentication.user
})

export default connect(mapStateToProps)(EngHome);