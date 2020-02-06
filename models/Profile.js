const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create schema

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'users'
    },
    handle: {
        type: String,
        requiredPaths: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String,
    },
    location: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        instagram: {
            type: String
        },
    },
    date: {
        type: String,
        default: Date.now
    }

});

module.exports = User = mongoose.model('profile', profileSchema)