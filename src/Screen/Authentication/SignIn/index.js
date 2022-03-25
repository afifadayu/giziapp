import React from 'react';
import axios from 'axios';
import jwt, { decode } from 'jsonwebtoken';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import * as actionTypes from '../../../store/actions';
import url from '../../../url';

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        const { cookies } = props
        this.state = {
            username: '',
            password: '',
            token: cookies.get('token') || ''
        };
        this.onUsernameInput = this.onUsernameInput.bind(this);
        this.onPasswordInput = this.onPasswordInput.bind(this);
        this.handleSignInClick = this.handleSignInClick.bind(this);
    }

    onUsernameInput(event){
        this.setState({
            username: event.target.value,
        })
    }

    onPasswordInput(event) {
        this.setState({
            password: event.target.value,
        })
    }

    handleSignInClick() {
        axios.post(`${url}/login`, {
            user_name: this.state.username,
            password: this.state.password
        })
        .then((response) => {
            if(response.data.error == false) {
                const cookies = this.props.cookies
                const token = response.data.token
                const user_name = response.data.user_name
                cookies.set('token', token, { path: '/' })
                cookies.set('user_name', user_name, { path: '/' })
                this.props.history.push('/beranda')
            }
            else {
                alert("Maaf, data yang anda masukkan salah!")
            }
        })
        .catch((error) => {
            alert("Maaf, data yang anda masukkan salah!")
        });
    }
    
    render () {
        return(
            <Aux>
                <Breadcrumb/>
                <div className="auth-wrapper">
                    <div className="auth-content">
                        <div className="auth-bg">
                            <span className="r"/>
                            <span className="r s"/>
                            <span className="r s"/>
                            <span className="r"/>
                        </div>
                        <div className="card">
                            <div className="card-body text-center">
                                <div className="mb-4">
                                    <i className="feather icon-unlock auth-icon"/>
                                </div>
                                <h3 className="mb-4">GiziApp</h3>
                                <div className="input-group mb-3">
                                    <input 
                                        type="text"
                                        className="form-control" 
                                        placeholder="Username" 
                                        value={this.state.username} 
                                        onChange={this.onUsernameInput}
                                    />
                                </div>
                                <div className="input-group mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Kata Sandi"
                                        value={this.state.password}
                                        onChange={this.onPasswordInput}
                                    />
                                </div>
                                <button 
                                    className="btn btn-primary shadow-2 mb-4"
                                    onClick={this.handleSignInClick}
                                >
                                    Masuk
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLogin: state.isLogin
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setLogin: (status) => dispatch({ type: actionTypes.AUTH_LOGIN, isLogin:status }),
    }
};

export default withCookies(connect(mapStateToProps,mapDispatchToProps)(SignIn));