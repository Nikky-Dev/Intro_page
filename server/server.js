require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const Portfolio = require('./models/Portfolio');

const fallbackData = {
  name: 'A Developer',
  role: 'Building elegant web experiences.',
  about: 'I create clean, responsive single-page applications with modern front-end and backend integration.',
  projects: [
    {
      title: 'Portfolio Landing Page',
      description: 'A responsive SPA design with animated sections and a modern visual layout.',
      tags: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      title: 'API Data Explorer',
      description: 'Frontend dashboard that loads project data from a backend API endpoint.',
      tags: ['Node.js', 'Express', 'Fetch'],
    },
    {
      title: 'Responsive Branding Site',
      description: 'A polished personal brand website optimized for desktop and mobile users.',
      tags: ['Responsive', 'Design', 'Accessibility'],
    },
  ],
  contacts: [
    { label: 'Email', value: 'hello@example.com', url: 'mailto:hello@example.com' },
    { label: 'GitHub', value: 'github.com/username', url: 'https://github.com/username' },
    { label: 'LinkedIn', value: 'linkedin.com/in/username', url: 'https://linkedin.com/in/username' },
  ],
};

const MONGO_URI = process.env.MONGO_URI;

async function connectDB() {
  if (!MONGO_URI) {
    console.warn('MONGO_URI not set — using fallback data only.');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
  }
}

app.get('/api/portfolio', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const doc = await Portfolio.findOne().lean();
      if (doc) return res.json(doc);
    }
    return res.json(fallbackData);
  } catch (err) {
    console.error('Error fetching portfolio from DB:', err.message || err);
    return res.json(fallbackData);
  }
});

app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
