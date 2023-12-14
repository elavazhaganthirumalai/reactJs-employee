import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import Styles from "./employee.module.css";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
    }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then((res) => {
      this.setState({ employee: res.data });
    });
  }
  cancel(){
    this.props.history.push('/employees');
}

  render() {
    return (
      <div>
        <div className={Styles.userDetails}>

          <h3 className="text-center"> View Employee Details</h3>
          <div className="card-body">
            <br></br>
            <div className="row">
              <label>
                {" "}
                First Name: <b>{this.state.employee.first_name}</b>
              </label>
            </div>
            <br></br>
            <div className="row">
              <label>
                {" "}
                Last Name: <b>{this.state.employee.last_name}</b>
              </label>
            </div>
            <br></br>
            <div className="row">
              <label>
                {" "}
                Email ID: <b>{this.state.employee.email_id}</b>
              </label>
            </div>
            <br></br>
            <div className="row">
              <label>
                {" "}
                Password: <b>{this.state.employee.password}</b>
              </label>
            </div>
            <br></br>
          </div>
          <div className="text-center">
          <button type="button" className={Styles.actionButton} onClick={this.cancel.bind(this)}>←Back</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
