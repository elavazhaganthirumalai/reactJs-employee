import React, { Component } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EmployeeService from '../services/EmployeeService'
import Styles from './employee.module.css'

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    submit = (employee) => {
        console.log("submitFunction")
        confirmAlert({
        
          title: 'Confirm Deletion',
          message: 'Are you sure you want to delete?',
          buttons: [
            {
              label: 'Yes',
                  onClick: () => {
                    this.deleteEmployee(employee.id)
                    console.log("Deleted Successfully")
                  } 
              },
            {
              label: 'No',
                onClick: () => {
                  console.log("Delete Declined")
              }
            }
          ]
        });
        console.log("confirmAlert")
      };

    render() {
        return (
            <div>
                 <h2 className="text-left">Employees List</h2>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th className="text-center"> First Name</th>
                                    <th className="text-center"> Last Name</th>
                                    <th className="text-center"> Email Id</th>
                                    <th className="text-center"> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id}>
                                             <td className="text-center"> { employee.first_name} </td>   
                                             <td className="text-center"> {employee.last_name}</td>
                                             <td className="text-center"> {employee.email_id}</td>
                                             <td className="text-center">
                                                 <button onClick={ () => this.editEmployee(employee.id)} className={Styles.actionButton}>Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.submit(employee)} className={Styles.actionButton}>Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className={Styles.actionButton}>View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                        <div className={Styles.center}>
                    <button className={Styles.addButton} onClick={this.addEmployee}>Add Employee</button>
                 </div>
                 
                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
