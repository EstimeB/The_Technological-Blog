const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('dashboard', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/comment/:id', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['blog_id'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('blog', {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
  // try {
  //   const commentData = await Comment.findByPk(req.params.id, {
  //     include: [
  //       {
  //         model: User,
  //         attributes: ['blog_id'],
  //       },
  //     ],
  //   });

  //   const comment = commentData.get({ plain: true });

  //   res.render('blog', {
  //     ...comment,
  //     logged_in: req.session.logged_in,
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// Use withAuth middleware to prevent access to route
router.get('/homepage', withAuth, async (req, res) => {
  console.log(req.session, 'homepage');
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: blog }],
    });

    const user = userData.get({ plain: true });
    console.log(user, 'user data');
    res.render('homepage', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  console.log(req.session, 'homepage');
  try {
    // Find the logged in user based on the session ID
    if (req.session.user_id) {
      const blogData = await Blog.findAll();

      const blogs = blogData.map((blog) => blog.get({ plain: true }));
      console.log(blogs, 'ublog data');
      res.render('dashboard', {
        ...blogs,
        user_name:req.session.user_name,
        user_id:req.session.use_id,
        email:req.session.email,
        logged_in: true,
      });
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
