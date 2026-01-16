const express = require('express');
const router = express.Router();
// Use mock data instead of actual model
const { Thread } = require('../mockData');
const auth = require('../middleware/auth');

// @route   GET api/threads
// @desc    Get all threads
// @access  Public
router.get('/', async (req, res) => {
  try {
    const threads = await Thread.find().sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/threads
// @desc    Create a thread
// @access  Public
router.post('/', async (req, res) => {
  const { title, content } = req.body;

  // Simple validation
  if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required' });
  }

  try {
    const newThread = new Thread({
      title,
      content,
      author: req.user ? req.user.id : null
    });

    const thread = await newThread.save();
    res.json(thread);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/threads/:id
// @desc    Get thread by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    
    if (!thread) {
      return res.status(404).json({ msg: 'Thread not found' });
    }
    
    res.json(thread);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Thread not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST api/threads/:id/comments
// @desc    Add a comment to a thread
// @access  Public
router.post('/:id/comments', async (req, res) => {
  const { content } = req.body;

  // Simple validation
  if (!content) {
    return res.status(400).json({ msg: 'Comment content is required' });
  }

  try {
    const thread = await Thread.findById(req.params.id);
    
    if (!thread) {
      return res.status(404).json({ msg: 'Thread not found' });
    }
    
    const newComment = {
      content,
      author: req.user ? req.user.id : null
    };
    
    thread.comments.unshift(newComment);
    await thread.save();
    
    res.json(thread);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Thread not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;