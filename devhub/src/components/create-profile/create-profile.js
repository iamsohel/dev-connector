import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextAreaField from '../common/TextAreaField';
import { createProfile } from '../../redux/actions/profileActions';
class CreateProfile extends Component {

    state = {
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        role: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
        errors: {}
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // const userData = {
        //     email: this.state.email,
        //     password: this.state.password,
        // }
        console.log(this.state)
         this.props.createProfile(this.state, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors, displaySocialInputs } = this.state;
        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (<div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.handleChange}
                    error={errors.twitter}
                />
                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.handleChange}
                    error={errors.facebook}
                />
                <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.handleChange}
                    error={errors.linkedin}
                />
                <InputGroup
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fab fa-instagram"
                    value={this.state.instagram}
                    onChange={this.handleChange}
                    error={errors.instagram}
                />
                <InputGroup
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.handleChange}
                    error={errors.youtube}
                />
            </div>);
        } 

        const options = [
            { label: '* Select Professional Role', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or teacher', value: 'Instructor or teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' }
        ];

        return (
            <div className="create-profile">
                <div className="container"> 
                    <div className="row"> 
                        <div className="col-md-6 m-auto"> 
                            <h1>Create your profile</h1>
                            <p className="lead text-center">Let's get some information to make your profile stand out</p>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.handleChange}
                                    error={errors.handle}
                                    info="A unique handle for your profile url. Your full name, company name, nick name"
                                />
                                <SelectListGroup
                                    placeholder="Status"
                                    name="role"
                                    value={this.state.role}
                                    onChange={this.handleChange}
                                    options = {options}
                                    error={errors.role}
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.handleChange}
                                    error={errors.company}
                                />
                                 <TextFieldGroup
                                    placeholder="Website"
                                    name="website"
                                    value={this.state.website}
                                    onChange={this.handleChange}
                                    error={errors.website}
                                />
                                 <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    error={errors.location}
                                />
                                 <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    onChange={this.handleChange}
                                    error={errors.skills}
                                    info="please use comma separated values (e.g. React.js, Node.js, MongoDB, AWS)"
                                />
                                 <TextFieldGroup
                                    placeholder="Github user name"
                                    name="githubusername"
                                    value={this.state.githubusername}
                                    onChange={this.handleChange}
                                    error={errors.githubusername}
                                />
                                <TextAreaField
                                    placeholder="Short Bio" 
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    error={errors.bio}
                                /> 
                                <div className="mb-3">
                                    <button type="button" onClick={() => {
                                        this.setState(prevState => ({
                                            displaySocialInputs: !prevState.displaySocialInputs
                                        }))
                                    }} className="btn btn-primary">Add social network links</button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));


