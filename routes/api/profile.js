const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

//const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Needer = require('../../models/Needer');
const Post = require('../../models/Post');

mongoose.set('useFindAndModify', false);

router.get('/me', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'phone']);
    if (!profile) {
      res.status(400).json({ msg: 'There is no Profile for this User' });
    } else {
      res.json(profile);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/donars', async (req, res) => {
  try {
    const profiles = await Profile.find({
      permission: 'approve'
    }).populate('user', ['name', 'phone']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/myDonars/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('needer', [
      'id'
    ]);
    if (post.needer.id === req.user.id) {
      const profiles = await Profile.find({
        bloodGroup: post.bloodGroup
      }).populate('user', ['name', 'phone']);
      res.json(profiles);
    } else {
      return res
        .status(400)
        .json({ msg: 'You did not create this Application' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Get One Profile
router.get('/profileId/:user_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'phone']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//Get One Donar
router.get('/donarId/:profileId', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(
      req.params.profileId
    ).populate('user', ['name', 'phone']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('phone', 'Mobile Number is missing')
        .not()
        .isEmpty(),
      check('bloodGroup', 'Blood group is missing')
        .not()
        .isEmpty(),
      check('can', 'Availability status is required')
        .not()
        .isEmpty(),
      check('area', 'Address is missing')
        .not()
        .isEmpty(),
      check('thana', 'Select your Thana')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      profession,
      bloodGroup,
      donateDate,
      bio,
      facebook,
      can,
      area,
      thana,
      permission
    } = req.body;

    const details = {};

    details.user = req.user.id;
    if (email) details.email = email;
    if (profession) details.profession = profession;
    if (bloodGroup) details.bloodGroup = bloodGroup;
    if (donateDate) details.donateDate = donateDate;
    if (bio) details.bio = bio;
    if (facebook) details.facebook = facebook;
    if (can) details.can = can;
    if (area) details.area = area;
    if (thana) details.thana = thana;
    if (permission) {
      details.permission = permission;
    } else {
      details.permission = 'request';
    }

    try {
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: details },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
