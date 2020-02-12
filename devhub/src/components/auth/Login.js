import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
class Login extends Component {

    state = {
        email: '',
        password: '',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(userData);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        if (this.props.auth.isAuthenticated) return <Redirect to="/dashboard" />;
        const { errors } = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your ProHub account</p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                />
                                 <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors:state.errors
});

export default connect(mapStateToProps, { loginUser})(Login);
