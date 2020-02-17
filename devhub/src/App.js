import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './components/dashboard/dashboard';
import CreateProfile from './components/create-profile/create-profile';
import EditProfile from './components/edit-profile/EditProfile';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './redux/store';
import setTokenAlwaysToHeader from './utils/set-token';
import PrivateRoute from './components/common/PrivateRoute';
import './App.css';
import AddExperience from './components/add-experience/AddExperience';
import AddEducation from './components/add-education/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';

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
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:handle" component={Profile} />
            <Switch> 
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
              <PrivateRoute exact path="/feed" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
            <Route exact path="/not-found" component={NotFound} />
            </div>
          </div>
          {/* <Footer /> */}
       </BrowserRouter>
   </Provider>
  );
}

export default App;
