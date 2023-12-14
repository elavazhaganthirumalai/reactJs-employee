import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import LoginComponent from './components/LoginComponent';
import Cookies from 'universal-cookie';
import Styles from './components/employee.module.css'

function App() {

  const cookies = new Cookies();
  var isLoggedIn = cookies.get('loginStatus');
  if (isLoggedIn === undefined) {
    isLoggedIn = false;
  }
  return (
    <div> {
      (isLoggedIn)
        ? <HeaderComponent />
        : null}
      <>
      <Router>
        <div className={Styles.mainContent}>
          <Switch>
            <Route path="/" exact component={LoginComponent}></Route>
            <PrivateRoute path="/employees" component={ListEmployeeComponent} />
            <PrivateRoute path="/add-employee/:id" component={CreateEmployeeComponent} />
            <PrivateRoute path="/view-employee/:id" component={ViewEmployeeComponent} />
          </Switch>
        </div>
        </Router>
        </>
    </div>

  );
}
function PrivateRoute({ component: Component, ...rest }) {
  const cookies = new Cookies();
  var isAuthenticated = cookies.get('loginStatus');
  if (isAuthenticated === undefined) {
    isAuthenticated = false;
  }
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
  );
}

export default App;
