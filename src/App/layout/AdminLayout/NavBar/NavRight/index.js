import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import { withCookies, Cookies } from 'react-cookie';

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';

class NavRight extends Component {
    state = {
        listOpen: false
    };

    handleRemoveCookie = () => {
        const { cookies } = this.props;
        cookies.remove('token'); // remove the cookie
        cookies.remove('user_name'); // remove the cookie
        this.setState({ 
            token: cookies.get("token"),
            user_name: cookies.get("user_name")
        });
    };

    render() {

        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    
                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-user"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div className="pro-head">
                                    <img src={Avatar1} className="img-radius" alt="User Profile"/>
                                    <span>{this.props.cookies.get('user_name')}</span>
                                </div>
                                <ul className="pro-body">
                                    <li>
                                        <a href='/signin' className="dropdown-item" onClick={this.handleRemoveCookie}>
                                            <i className="feather icon-log-out"/>Keluar
                                        </a>
                                    </li>
                                </ul>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {this.setState({listOpen: false});}} />
            </Aux>
        );
    }
}

export default withCookies(NavRight);
