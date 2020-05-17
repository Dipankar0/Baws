const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile number must be atleast 10 characters').isLength({
      min: 10
    }),
    check('bloodGroup', 'Blood group is required')
      .not()
      .isEmpty(),
    check('area', 'Address is required')
      .not()
      .isEmpty(),
    check('thana', 'Select your Thana')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      profession,
      bloodGroup,
      facebook,
      area,
      thana,
      password
    } = req.body;

    try {
      let user = await User.findOne({ phone });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        phone,
        email,
        bloodGroup,
        permission: 'request',
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const profile = new Profile({
        user: user.id,
        phone,
        email,
        bloodGroup,
        area,
        thana,
        can: 'yes',
        permission: 'request'
      });
      await profile.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
