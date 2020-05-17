import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Needer from './components/auth/Needer';
import Alert from './components/layout/Alert';
import Home from './components/layout/Home';

import HowToDonate from './components/Information/HowToDonate';
import HowToGet from './components/Information/HowToGet';
import Terms from './components/Information/TermsAndConditions';

import PrivateRoute from './components/routing/PrivateRoute';
import store from './store';
import { loadUser } from './actions/auth';
import { loadNeeder } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './components/create-profile/CreateProfile';
import Profile from './components/profile/Profile';
import MyProfile from './components/profile/MyProfile';
import EditProfile from './components/create-profile/EditProfile';
import Admin from './components/admin/Admin';
import Customers from './components/admin/customer/Customers';
import Customer from './components/admin/customer/Customer';
import Users from './components/admin/user/Users';
import User from './components/admin/user/User';
import AddPost from './components/post/AddPost';
import Post from './components/post/Post';
import Posts from './components/post/Posts';
import Donars from './components/donar/Donars';
import MyPost from './components/post/MyPost';
import Donar from './components/donar/Donar';
import AboutUs from './components/Information/AboutUs';
import DonorDashBoard from './components/layout/DonorDashBoard';
import AddApplication from './components/post/AddApplication';
import NoApplication from './components/post/NoApplication';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadNeeder());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Route exact path='/' component={Home} />
          <section className=''>
            <Switch>
              <Route exact path='/about' component={AboutUs} />
              <Route exact path='/howtodonate' component={HowToDonate} />
              <Route exact path='/howtoget' component={HowToGet} />
              <Route exact path='/termsandconditions' component={Terms} />
              <Route exact path='/newApplication' component={NoApplication} />
              <Route exact path='/posts/postId/:id' component={Post} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/needer' component={Needer} />
              <PrivateRoute
                exact
                path='/addApplication'
                component={AddApplication}
              />
              <PrivateRoute exact path='/admin' component={Admin} />
              <PrivateRoute exact path='/customers' component={Customers} />
              <PrivateRoute exact path='/customer/:id' component={Customer} />
              <PrivateRoute exact path='/users' component={Users} />
              <PrivateRoute exact path='/user/:id' component={User} />
              <PrivateRoute
                exact
                path='/donors/postId/:id'
                component={Donars}
              />
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute exact path='/profile/me' component={MyProfile} />
              <PrivateRoute
                exact
                path='/myDashBoard'
                component={DonorDashBoard}
              />
              <PrivateRoute
                exact
                path='/profile/profileId/:id'
                component={Profile}
              />
              <PrivateRoute
                exact
                path='/profile/donorId/:id'
                component={Donar}
              />
              <PrivateRoute exact path='/posts/myPost' component={MyPost} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
