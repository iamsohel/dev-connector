import React, { Component } from 'react';
import userService from '../../services/userService';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';

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
        try {
            this.props.registerUser(newUser);
           // const { data } = await userService.register(newUser);
           // console.log(data);
        } catch (error) {
            //this.setState({errors: error.response.data})
            //console.log(error.response.data)
       }
    }

    render() {
        const { errors } = this.state;
        const { user } = this.props.auth;
        return (
            <div className="register">
                {user? user.name : ''}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your ProHub account</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="text" className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.name
                                    })} placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} />
                                    {errors.name && (<div class="invalid-feedback">
                                      {errors.name}
                                    </div>)}
                                </div>
                                <div className="form-group">
                                    <input type="email" className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.email})} onChange={this.handleChange} placeholder="Email Address" name="email" value={this.state.email} />
                                      {errors.email && (<div class="invalid-feedback">
                                        {errors.email}
                                      </div>)}
                                    <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.password })} onChange={this.handleChange} placeholder="Password" name="password" value={this.state.password} />
                                      {errors.password && (<div class="invalid-feedback">
                                       {errors.password}
                                      </div>)}
                                </div>
                                <div className="form-group">
                                    <input type="password" className={classnames('form-control form-control-lg', {
                                        'is-invalid': errors.confirm_password})} onChange={this.handleChange} placeholder="Confirm Password" name="confirm_password" value={this.state.confirm_password} />
                                      {errors.confirm_password && (<div class="invalid-feedback">
                                         {errors.confirm_password}
                                      </div>)}
                                </div>
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
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { registerUser})(Register);
