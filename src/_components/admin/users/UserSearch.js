import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Form, Button, Col} from 'react-bootstrap';
import { commonActions, carActions, alertActions, adminActions } from '../../../_action';
import '../../styles/CarSearch.css';
import DataTable from 'react-data-table-component';
import {CAR_STATUS} from '../../../_constants'
import Popup from "reactjs-popup";
import UserInfo from '../../customer/UserInfo';


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


const UserDetailPopupWindow = (props) => {

    return(
        <div>
            <Popup trigger={<Button variant="outline-info">Details</Button>}
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
                                    User Information
                                </span>
                            </div>
                            <div id="pop_content">
                                <UserInfo {...props} targer_user = {props.targer_user} />
                            </div>
                            <div id="pop_footer">
                            </div>
                        </div>
                )}
            </Popup>
        </div>
    );
}
  

class UserSearch extends Component{

    constructor(props){
        super(props);
        this.state = {
            users: [],
            columns : [
                        { name: 'User ID', selector: 'user_id', sortable: true, center: true },
                        { name: 'Username', selector: 'username', sortable: true, center: true },
                        { name: 'First Name', selector: 'first_name', sortable: true, center: true },
                        { name: 'Last Name', selector: 'last_name', sortable: true, center: true },
                        { name: 'Email', selector: 'email', sortable: true, center: true },
                        { name: 'Role', selector: 'role', sortable: false, center: true },
                        {
                            cell: (row) => {
                                return <UserDetailPopupWindow targer_user = {row} />
                            },
                            ignoreRowClick: true,
                            allowOverflow: true,
                            button: true,
                            center: true
                        }
                    ],
            roles: [
                {'name': 'Admin', 'isChecked':false},
                {'name': 'Customer', 'isChecked':false},
                {'name': 'Engineer', 'isChecked':false}
            ],
            role: [],
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            loading: true
        }
    }

    onSearch = async () => {
        let search_paramters= {
            role: [],
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
        }

        this.state.roles.map(option=>{
            if (option.isChecked){
                search_paramters.role.push(option.name)
            }
        })

        let users = await adminActions.getUsersWithparams(this.props.user.username, this.props.user.password, search_paramters)
        if (users.length !== 0){
            this.setState({
                users: users,
                loading: false
            });
        }else{
            alertActions.show_info("Cannot find users with your condition.", "", null)
        }
    }

    selectOptions = async (target, action) =>{

        var target_arr;

        if (action === 'role'){
            target_arr = this.state.roles;
            target_arr.map((option)=>{
                if (option.name === target.option.name){
                    option.isChecked = !option.isChecked
                }
            })
        }

        await this.setState({
            role: action === 'role'?target_arr:this.state.role,
        });
    } 

    onInputChange = async (e, symbol) => {
        e.preventDefault();
        await this.setState({ 
            first_name: symbol==='first_name'?e.target.value:this.state.first_name,
            last_name: symbol==='last_name'?e.target.value:this.state.last_name,
            email: symbol==='email'?e.target.value:this.state.email,
            username: symbol==='username'?e.target.value:this.state.username
        });
    }

    onClear = () => {

        let rolesC = []
        this.state.roles.map(option=>{
            option.isChecked = false
            rolesC.push(option)
        })

        this.setState({
            role: rolesC,
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            loading: true
        });
    }

    render(){
        return(
            <div>
                <div id = "search-bar">
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="roles">
                                <Form.Label className="search-label">Role: </Form.Label>
                                <br></br>
                                {this.state.roles.map((option)=>
                                    <Form.Check 
                                        key={option.name}
                                        inline 
                                        type="checkbox" 
                                        label={option.name} 
                                        value={option.name}
                                        onChange={()=>{this.selectOptions({option},'role')}} id={`role-${option.name}-1`}
                                        checked={option.isChecked}
                                    />
                                )}
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="3" controlId="first_name">
                                <Form.Label className="search-label">First Name:</Form.Label>
                                <Form.Control
                                    type="text" 
                                    onChange={(e)=> this.onInputChange(e, 'first_name')}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="first_name">
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    onChange={(e)=> this.onInputChange(e, 'last_name')}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    onChange={(e)=> this.onInputChange(e, 'email')}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="3" controlId="username">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    onChange={(e)=> this.onInputChange(e, 'username')}
                                />
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
                    this.state.users.length != 0 ?
                        <div id="table-responsive">
                            <DataTable
                                title="Matched Users:"
                                columns={this.state.columns}
                                data={this.state.users}
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

export default connect(mapStateToProps)(UserSearch);