require('dotenv').config();
const mongoose = require('mongoose');
const Portfolio = require('./models/Portfolio');

const MONGO_URI = process.env.MONGO_URI;

const seedData = {
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

async function runSeed() {
  if (!MONGO_URI) {
    console.error('MONGO_URI environment variable is not set. Aborting seed.');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding');

    const existing = await Portfolio.findOne().lean();
    if (existing) {
      console.log('Portfolio document already exists — skipping insert.');
    } else {
      await Portfolio.create(seedData);
      console.log('Seed data inserted.');
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message || err);
    process.exit(1);
  }
}

runSeed();
