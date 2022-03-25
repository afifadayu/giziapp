import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import jwt, { decode } from 'jsonwebtoken';
import { withCookies, Cookies } from "react-cookie";

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    state = {
        token: this.props.cookies.get('token') || "",
    };

    // handleCookie = () => {
    //     const { cookies } = this.props;
    //     cookies.set('token', { path: "/" }); // setting the cookie
    //     this.setState({ 
    //         token: cookies.get('token') 
    //     }); 
    // };

    // componentDidMount(){
    //     const { cookies } = this.props;
    //     if (cookies != undefined) {
    //         cookies.remove("token")
    //         window.location.replace('/signin')
    //     } else{
    //         cookies.set("token", { path: "/" })
    //     }
    //     this.setState({ 
    //         token: cookies.get("token") 
    //     });
    // }

    // componentDidMount() {
    //     const token = this.props.cookies.get('token')
    //     console.log('INI TOKEN -->', token)

    //     var now = new Date();
    //     var time = now.getTime();
    //     var expireTime = time;
    //     now.setTime(expireTime);
    //     document.cookie = 'cookie=ok;expires=' + now.toUTCString() + ';path=/';
    //     console.log("doc cokie", document.cookie);  // 'Wed, 31 Oct 2012 08:50:17 UTC'

    //     // if (token != '' && token != undefined) {
    //     //     const decoded = jwt.decode(token)
    //     //     console.log("DECODED:", decoded)
    //     //     if (Date.now() < decoded.exp * 1000) {
    //     //         const cookies = this.props.cookies
    //     //         cookies.remove('token')
    //     //         window.location.replace('/')
    //     //     }
    //     // } else if (token == '' && token == undefined) {
    //     //     window.location.replace('/signin')
    //     // }
    // }            

    render() {
        const menu = routes.map((route, index) => {
          return (route.component) ? (
              <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}
                            <Route path="/" component={AdminLayout} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default withCookies(App);
