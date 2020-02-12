import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../redux/actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Register extends Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirm_password
        }
        this.props.registerUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        if (this.props.auth.isAuthenticated) return <Redirect to="/dashboard" />;
        const { errors } = this.state;
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your ProHub account</p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    error={errors.name}
                                />
                                 <TextFieldGroup
                                    placeholder="Email address"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    placeholder="Confirm Password"
                                    name="confirm_password"
                                    type="password"
                                    value={this.state.confirm_password}
                                    onChange={this.handleChange}
                                    error={errors.confirm_password}
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

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors:state.errors
});

export default connect(mapStateToProps, { registerUser})(withRouter(Register));
