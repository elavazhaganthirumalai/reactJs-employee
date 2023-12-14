import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import Styles from './employee.module.css'

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            first_name: '',
            last_name: '',
            email_id: '',
            password:''
        }
        this.changefirst_nameHandler = this.changefirst_nameHandler.bind(this);
        this.changelast_nameHandler = this.changelast_nameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
    }

    componentDidMount(){

        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data;
                this.setState({first_name: employee.first_name,
                    last_name: employee.last_name,
                    email_id : employee.email_id,
                    password:employee.password
                });
            });
        }        
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        if ("" === this.state.first_name) {
            this.setState({firstNameError:"Please enter your first name"})
            return
        }
        if ("" === this.state.last_name) {
            this.setState({lastNameError:"Please enter your last name"})
            return
        }
        if ("" === this.state.email_id) {
            this.setState({emailError:"Please enter your email"})
            return
        }
        
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email_id)){
            this.setState({emailError:"Please enter valid email"})
            return 
        }

        if ("" === this.state.password) {
            this.setState({passWordError:"Please enter a password"})
            return
        }

        if (this.state.password.length < 7) {
            this.setState({passWordError:"The password must be 8 characters or longer"})
            return
        }
        let employee = {first_name: this.state.first_name, last_name: this.state.last_name, email_id: this.state.email_id,password:this.state.password};
        console.log('employee => ' + JSON.stringify(employee));

        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/employees');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }
    }
    
    changefirst_nameHandler= (event) => {
        this.setState({first_name: event.target.value});
    }
    changePasswordHandler= (event) => {
        this.setState({password:event.target.value});
    }
    changelast_nameHandler= (event) => {
        this.setState({last_name: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({email_id: event.target.value});
    }

    cancel(){
        this.props.history.push('/employees');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                   <div className = {Styles.createOrEditUser}>
                        <div className = "row">
                            <div className = " col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = {Styles.inputContainer}>
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="first_name" className="form-control" 
                                                value={this.state.first_name} onChange={this.changefirst_nameHandler}/>
                                                <label className={Styles.errorLabel}>{this.state.firstNameError}</label>
                                        </div>
                                        
                                        <br></br>
                                        <div className = {Styles.inputContainer}>
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="last_name" className="form-control" 
                                                value={this.state.last_name} onChange={this.changelast_nameHandler}/>
                                                <label className={Styles.errorLabel}>{this.state.lastNameError}</label>
                                        </div>
                                        
                                        <br></br>
                                        <div className = {Styles.inputContainer}>
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="email_id" className="form-control" 
                                                value={this.state.email_id} onChange={this.changeEmailHandler}/>
                                                <label className={Styles.errorLabel}>{this.state.emailError}</label>
                                        </div>
                                        <br></br>
                                        <div className = {Styles.inputContainer}>
                                            <label> Password: </label>
                                            <input type="password" placeholder="Password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changePasswordHandler}/>
                                                <label className={Styles.errorLabel}>{this.state.passWordError}</label>
                                        </div>  
                                        
                                        <br></br>
                                        <div className='text-center'>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
