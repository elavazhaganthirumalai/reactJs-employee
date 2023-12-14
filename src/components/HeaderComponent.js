import React from 'react';
import logo from '../components/ela-logo.png';
import logout from '../components/white-logout-logo.png';
import Styles from './employee.module.css';
import Cookies from 'universal-cookie';

const HeaderComponent = React.memo(() => {
    
    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove("loginStatus");
        window.location.replace("/");
        alert("You have successfully logged out!");
    };

    console.log("Header Rendered");

    return (
        <header className={Styles.header}>
            <img className={Styles.logoImage} src={logo} alt="Ela Logo" />
            <img
                onClick={handleLogout}
                className={Styles.logoutButton}
                src={logout}
                alt="Logout Logo"
            />
        </header>
    );
});


export default HeaderComponent;
