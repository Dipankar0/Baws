const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Needer = require('../../models/Needer');
const Profile = require('../../models/Profile');

router.post(
  '/newPost',
  [
    check('name', 'Your name is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile Number is required')
      .not()
      .isEmpty(),
    check('bloodGroup', 'Select Blood Group')
      .not()
      .isEmpty(),
    check('text', 'Details filed is required')
      .not()
      .isEmpty(),
    check('area', 'Clinic Address is required')
      .not()
      .isEmpty(),
    check('thana', 'Select Thana of Clinic')
      .not()
      .isEmpty(),
    check('clinicName', 'Name of Hospital is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        name,
        phone,
        bloodGroup,
        clinicName,
        area,
        thana,
        text
      } = req.body;

      let needer = await Needer.findOne({ phone });
      if (needer) {
        return res.status(400).json({
          errors: [
            {
              msg:
                'This mobile number was used to post before, find donar directly'
            }
          ]
        });
      } else {
        const password = phone;
        needer = new Needer({
          name,
          phone,
          password
        });

        const salt = await bcrypt.genSalt(10);

        needer.password = await bcrypt.hash(password, salt);

        await needer.save();

        const post = new Post({
          needer: needer.id,
          text,
          bloodGroup,
          clinicName,
          area,
          thana
        });
        await post.save();

        const payload = {
          user: {
            id: needer.id
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.post(
  '/addPost',
  [
    auth,
    [
      (check('bloodGroup', 'BloodGroup is required')
        .not()
        .isEmpty(),
      check('text', 'Details field is required')
        .not()
        .isEmpty(),
      check('area', 'Clinic Address is required')
        .not()
        .isEmpty(),
      check('thana', 'Select Thana of Clinic')
        .not()
        .isEmpty(),
      check('clinicName', 'Name of Hospital is required')
        .not()
        .isEmpty())
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { bloodGroup, clinicName, area, thana, text } = req.body;

      const needer = await Needer.findById(req.user.id).select('-password');

      const newPost = new Post({
        needer: needer.id,
        text,
        bloodGroup,
        clinicName,
        area,
        thana
      });

      const post = await newPost.save();
      console.log(post);
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('needer', ['id', 'name', 'phone'])
      .sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/myPosts', auth, async (req, res) => {
  try {
    const posts = await Post.find({ needer: req.user.id })
      .populate('needer', ['name', 'phone'])
      .sort({ date: -1 });

    let duration;
    let avPosts = [];
    posts.map(post => {
      duration = moment().diff(moment(post.date), 'days');
      if (duration <= 7) {
        avPosts.push(post);
      }
    });
    res.json(avPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/bloodGroup', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const posts = await Post.find({
      bloodGroup: user.bloodGroup
    })
      .populate('needer', ['name', 'phone'])
      .sort({ date: -1 });

    let duration;
    let avPosts = [];
    posts.map(post => {
      duration = moment().diff(moment(post.date), 'days');
      if (duration <= 7) {
        avPosts.push(post);
      }
    });
    res.json(avPosts);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.get('/postId/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('needer', [
      'name',
      'phone'
    ]);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

//Post Comment
router.post(
  '/comment/:postId',

  [
    check('text', 'Text is required')
      .not()
      .isEmpty(),
    check('name', 'Name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.postId);

      const newComment = {};
      newComment.text = req.body.text;
      newComment.name = req.body.name;
      if (req.body.donar) {
        const profile = await Profile.findOne({ user: req.body.donar });
        newComment.donar = profile.id;
      }

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/like/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/comments/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const comments = await Comment.find({ post: req.params.id }).sort({
      date: 1
    });
    res.json(comments);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.get('/donors', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);

    if (!profiles) {
      return res.status(400).json({
        errors: [
          {
            msg: 'There is no donor'
          }
        ]
      });
    } else {
      res.json(profiles);
    }
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;

/*//Edit Comment
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //const user = await User.findById(req.user.id).select('-password');

      const newComment = {
        text: req.body.text,
        name: req.body.name,
        phone: req.body.phone,
        bloodGroup: req.body.bloodGroup,
        post: req.params.id,
        user: req.user.id
      };

      const comment = await Comment.findOneAndUpdate(
        { post: req.params.id, _id: req.body.commentId },
        { $set: newComment },
        { new: true, upsert: true }
      );

      res.json(comment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);*/

/*router.post(
  '/newPost/:id',
  [
    check('name', 'Your name is required')
      .not()
      .isEmpty(),
    check('phone', 'Mobile Number is required')
      .not()
      .isEmpty(),
    check('bloodGroup', 'This field is required')
      .not()
      .isEmpty(),
    check('text', 'This field is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, phone, bloodGroup, text } = req.body;
      const newPost = { name, phone, bloodGroup, text };
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: newPost },
        { new: true, upsert: true }
      );
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);*/

/*router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});*/
