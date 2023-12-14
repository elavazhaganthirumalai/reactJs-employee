import React from "react";
import EmployeeService from '../services/EmployeeService';
import Cookies from 'universal-cookie';
import Styles from './employee.module.css'


export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email_id: "", password: "",emailError:"",passWordError:"" };
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            this.onLoginClick(e)
        }
    }
    
    onLoginClick = (e) => {
        e.preventDefault();
        this.setState({emailError:""});
        this.setState({passWordError:""});
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

        console.log('email', this.state.email_id)
        console.log('password', this.state.password)
        let employee = { email_id: this.state.email_id, password: this.state.password }
        EmployeeService.loginEmployee(employee).then(res => {
            console.log(res.data);
            if (res.data === true) {
                const cookies = new Cookies();
                cookies.set('loginStatus', 'true');
                console.log("login cookie setted")
                window.location.replace("/employees");
                alert("You have successfully logged In!")
                // this.props.history.push('/employees');
            } else {
                alert("You have entered an invalid email or password");
            }
        });
    }
    render() {
        return <div className={Styles.mainContainer}>
        <div className={Styles.titleContainer}>
            <div>Sign in</div>
        </div>
        <br />
            <div className={Styles.inputContainer}>
                <label>Email ID:</label>
            <input
                value={this.state.email_id}
                name="email_id"
                placeholder="Enter your email here"
                onChange={(event) => {
                    this.setState({ email_id: event.target.value });
                    console.log(this.state.email_id);
                }}
                    className={Styles.inputBox}
                    onKeyDown={this.onKeyDown.bind(this)}
            />
            <label className={Styles.errorLabel}>{this.state.emailError}</label>
        </div>
            <div className={Styles.inputContainer}>
            <label>Password:</label>
            <input
                value={this.state.password}
                name="password"
                type="password"
                placeholder="Enter your password here"
                onChange={(event) => {
                    this.setState({ password: event.target.value });
                    console.log(this.state.password);
                }}
                    className={Styles.inputBox}
                    onKeyDown={this.onKeyDown.bind(this)}
            />
            <label className={Styles.errorLabel}>{this.state.passWordError}</label>
            </div>
            <br />
            
        <div className={Styles.inputContainer}>
            <button
                className={Styles.loginButton}
                    onClick={this.onLoginClick}
                    onKeyDown={this.onKeyDown.bind(this)}
            >LogIn</button>
        </div>
    </div>
    }

}