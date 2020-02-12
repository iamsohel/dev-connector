import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/create-profile/create-profile';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './redux/store';
import setTokenAlwaysToHeader from './utils/set-token';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';

setTokenAlwaysToHeader();

function App() {
  return (
    <Provider store= {store}>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch> 
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            </div>
          </div>
          {/* <Footer /> */}
       </BrowserRouter>
   </Provider>
  );
}

export default App;
