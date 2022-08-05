import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {

    //Declare State objects
    const location = useLocation();
    const {pathname} = location;
    const curPath = pathname.split('/');
    
    return (
        <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
     
      <div className="logo"><a href="http://www.creative-tim.com" className="simple-text logo-normal">
          Admin
        </a></div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className={curPath[1] == 'Dashboard' ? 'active nav-item' : 'nav-item'}>
            <NavLink  className="nav-link" to="/Dashboard">
              <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
              </NavLink>
          </li>
          <li className={curPath[1] == 'UserList' ? 'active nav-item' : 'nav-item'}>
            <NavLink to="/UserList"  className="nav-link">
              <i className="material-icons">person</i>
              <p>User Profile</p>
            </NavLink>
          </li>
          
        </ul>
      </div>
    </div>
    )
}

export default Sidebar;