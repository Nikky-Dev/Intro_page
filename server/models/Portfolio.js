const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
});

const ContactSchema = new mongoose.Schema({
  label: String,
  value: String,
  url: String,
});

const PortfolioSchema = new mongoose.Schema({
  name: String,
  role: String,
  about: String,
  projects: [ProjectSchema],
  contacts: [ContactSchema],
}, { timestamps: true });

module.exports = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
