const express = require('express');
const router = express.Router();
const jwtAuth = require('../../middleware/jwtAuth');
const validateObjectId = require('../../middleware/validateObjectId');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route  GET api/profile
// @desc Return current user
// @access Private
router.get('/', jwtAuth, async (req, res) => {
    const errors = {};
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
        errors.noprofile = 'There is no profile for this user.';
        res.status(400).send(errors);
    }
    res.send(profile);
});

// @route  GET api/profile/handle/:handle
// @desc Return profile by handle
// @access public
router.get('/handle/:handle', async (req, res) => {
    const errors = {};
    const profile = await Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']);
    if (!profile) {
        errors.noprofile = 'There is no profile for this user.';
        res.status(400).send(errors);
    }
    res.send(profile);
});

// @route  GET api/profile/all
// @desc Return all profile 
// @access public
router.get('/all', async (req, res) => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.send(profiles);
});

// @route  GET api/profile/user/:user_id
// @desc Return profile by user id
// @access private
router.get('/user/:user_id', validateObjectId, async (req, res) => {
    const errors = {};
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) {
        errors.noprofile = 'There is no profile for this user.';
        res.status(400).send(errors);
    }
    res.send(profile);
});


// @route  POST api/profile
// @desc Create/Edit user profile
// @access Private
router.post('/', jwtAuth, async (req, res) => {
    const validateProfileInput = require('../../validation/profile');
    const { errors, isValid } = validateProfileInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    const profileFields = {};
    const { handle, company, education, website, bio, location, skills, githubusername, role, youtube,
        facebook, instagram, linkedin, twitter } = req.body;

    profileFields.user = req.user.id;
    if (handle) profileFields.handle = handle;
    if (company) profileFields.company = company;
    if (bio) profileFields.bio = bio;
    if (education) profileFields.education = education;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (githubusername) profileFields.githubusername = githubusername;
    if (role) profileFields.role = role;
    //skills
    if (typeof skills !== 'undefined') {
        profileFields.skills = skills.split(',');
    }
    //social
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        if (profile) {
            //update
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            res.send(updatedProfile);
        } else {
            //create
            const checkSameHandle = await Profile.findOne({ handle });
            if (checkSameHandle) {
                errors.handle = 'This handle is already exists';
                res.status(400).send(errors);
            }
            const newProfile = await new Profile(profileFields).save();
            res.send(newProfile);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Somethings went wrong');
    }
});

// @route  POST api/profile/experience
// @desc add user experience
// @access Private
router.post('/experience', jwtAuth, async (req, res) => {
    const validateExperienceInput = require('../../validation/experience');
    const { errors, isValid } = validateExperienceInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    try {
        const profile = await (await Profile.findOne({ user: req.user.id }));
        if (profile) {
            profile.experience.unshift(req.body)
        }
        const updatedProfile = await profile.save();
        res.send(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Somethings went wrong');
    }
});

// @route  POST api/profile/education
// @desc add user education
// @access Private
router.post('/education', jwtAuth, async (req, res) => {
    const validateEducationInput = require('../../validation/education');
    const { errors, isValid } = validateEducationInput(req.body);
    //if error, isValid will false else true
    if (!isValid) return res.status(400).send(errors);
    try {
        const profile = await (await Profile.findOne({ user: req.user.id }));
        if (profile) {
            profile.education.unshift(req.body)
        }
        const updatedProfile = await profile.save();
        res.send(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Somethings went wrong');
    }
});

// @route  DELETE api/profile/education
// @desc delete an education
// @access Private
router.delete('/education/:id', [jwtAuth, validateObjectId], async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id);
        profile.education.splice(removeIndex, 1);
        const updatedProfile = await profile.save();
        res.send(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Somethings went wrong');
    }
});

// @route  DELETE api/profile/experience
// @desc delete an experience
// @access Private
router.delete('/experience/:id', [jwtAuth, validateObjectId], async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);
        profile.experience.splice(removeIndex, 1);
        const updatedProfile = await profile.save();
        res.send(updatedProfile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Somethings went wrong');
    }
});

// @route  DELETE api/profile/user_id
// @desc delete an user and profile
// @access Private
router.delete('/', jwtAuth, async (req, res) => {
    try {
        const profile = await Profile.findOneAndRemove({ user: req.user.id });
        const user = await User.findOneAndRemove({ _id: req.user.id });
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.status(500).send('Somethings went wrong');
    }
});

module.exports = router;