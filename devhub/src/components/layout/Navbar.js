import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (

            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">ProHub</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles"> professionals
                            </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/feed">
                                    Post Feed
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    Dashboard
                            </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    <img className="rounded-circle" style={{ width: '25px', marginRight: '5px' }} src="https://www.gravatar.com/avatar/anything?s=200&d=mm"
                                        alt="" title="You must have a Gravatar connected to your email to display an image" /> Logout
                            </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        )
    }
}

export default Navbar;
