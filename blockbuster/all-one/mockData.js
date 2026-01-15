// Mock data implementation for testing without MongoDB
const bcrypt = require('bcrypt');

// Helper function to generate IDs
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Mock data storage
const users = [];
const posts = [];
const threads = [];
const jobs = [];

// Mock User model
const User = {
  findOne: async (query) => {
    if (query.username) {
      return users.find(user => user.username === query.username);
    }
    if (query.email) {
      return users.find(user => user.email === query.email);
    }
    if (query._id) {
      return users.find(user => user._id === query._id);
    }
    return null;
  },
  create: async (userData) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const newUser = {
      _id: generateId(),
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      date: new Date()
    };
    
    users.push(newUser);
    return newUser;
  }
};

// Mock Post model
const Post = {
  find: function() {
    return {
      sort: function() {
        return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
      }
    };
  },
  findById: function(id) {
    return posts.find(post => post._id === id);
  },
  create: function(postData) {
    const post = {
      _id: generateId(),
      ...postData,
      date: new Date(),
      upvotes: 0,
      comments: []
    };
    posts.push(post);
    return post;
  },
  findByIdAndUpdate: function(id, update) {
    const index = posts.findIndex(post => post._id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...update };
      return posts[index];
    }
    return null;
  },
  findByIdAndDelete: function(id) {
    const index = posts.findIndex(post => post._id === id);
    if (index !== -1) {
      const deleted = posts[index];
      posts.splice(index, 1);
      return deleted;
    }
    return null;
  }
};

// Mock Thread model
const Thread = {
  find: function() {
    return {
      sort: function() {
        return [...threads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    };
  },
  findById: function(id) {
    return threads.find(thread => thread._id === id);
  },
  create: function(threadData) {
    const thread = {
      _id: generateId(),
      title: threadData.title,
      content: threadData.content,
      author: threadData.author,
      comments: [],
      createdAt: new Date()
    };
    threads.push(thread);
    return thread;
  },
  findByIdAndUpdate: function(id, update) {
    const index = threads.findIndex(thread => thread._id === id);
    if (index !== -1) {
      threads[index] = { ...threads[index], ...update };
      return threads[index];
    }
    return null;
  },
  findByIdAndDelete: function(id) {
    const index = threads.findIndex(thread => thread._id === id);
    if (index !== -1) {
      const deleted = threads[index];
      threads.splice(index, 1);
      return deleted;
    }
    return null;
  }
};

// Mock Job model
const Job = {
  find: function() {
    return {
      sort: function() {
        return [...jobs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    };
  },
  findById: function(id) {
    return jobs.find(job => job._id === id);
  },
  create: function(jobData) {
    const job = {
      _id: generateId(),
      title: jobData.title,
      company: jobData.company,
      description: jobData.description,
      link: jobData.link,
      author: jobData.author,
      createdAt: new Date()
    };
    jobs.push(job);
    return job;
  },
  findByIdAndUpdate: function(id, update) {
    const index = jobs.findIndex(job => job._id === id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...update };
      return jobs[index];
    }
    return null;
  },
  findByIdAndDelete: function(id) {
    const index = jobs.findIndex(job => job._id === id);
    if (index !== -1) {
      const deleted = jobs[index];
      jobs.splice(index, 1);
      return deleted;
    }
    return null;
  }
};

// Initialize mock data with some test data
function initMockData() {
  // Add a test user
  users.push({
    _id: generateId(),
    username: 'testuser',
    email: 'test@example.com',
    password: '$2b$10$X/4xyVs9vhvQ6Ry7T.5zXO9aBL9QvVP.Dg5VBQD5xLzjJ3H1Ly7Aq', // password123
    date: new Date()
  });
  
  // Add some test posts
  posts.push({
    _id: generateId(),
    title: 'Test Post',
    url: 'https://example.com',
    text: 'This is a test post',
    author: 'testuser',
    date: new Date(),
    upvotes: 5,
    comments: []
  });
  
  // Add a test thread
  threads.push({
    _id: generateId(),
    title: 'Discussion Thread',
    content: 'This is a discussion thread',
    author: 'testuser',
    date: new Date(),
    comments: []
  });
  
  // Add a test job
  jobs.push({
    _id: generateId(),
    title: 'Software Developer',
    company: 'Tech Company',
    description: 'We are looking for a software developer',
    link: 'https://example.com/jobs',
    author: 'testuser',
    date: new Date()
  });
  
  console.log('Mock data initialized');
}

module.exports = {
  User,
  Post,
  Thread,
  Job,
  initMockData
};