import React, { Component } from 'react'

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
        console.log(userData)
    }
    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your ProHub account</p>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" onChange={this.handleChange} name="email" value={this.state.email} />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" onChange={this.handleChange} name="password" value={this.state.email} />
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

export default Login;
