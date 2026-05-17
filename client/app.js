const state = {
  portfolio: {
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
  },
};

function createProjectCard(project) {
  const card = document.createElement('article');
  card.className = 'project-card';

  const title = document.createElement('h3');
  title.textContent = project.title;

  const description = document.createElement('p');
  description.textContent = project.description;

  const tagList = document.createElement('div');
  tagList.className = 'project-tags';
  project.tags.forEach((tag) => {
    const tagItem = document.createElement('span');
    tagItem.className = 'project-tag';
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });

  card.append(title, description, tagList);
  return card;
}

function createContactCard(contact) {
  const card = document.createElement('div');
  card.className = 'contact-card';

  const title = document.createElement('h3');
  title.textContent = contact.label;

  const link = document.createElement('a');
  link.href = contact.url;
  link.target = '_blank';
  link.rel = 'noreferrer';
  link.textContent = contact.value;

  card.append(title, link);
  return card;
}

function renderPortfolio(portfolio) {
  document.getElementById('hero-name').textContent = portfolio.name;
  document.getElementById('hero-role').textContent = portfolio.role;
  document.getElementById('about-text').textContent = portfolio.about;
  document.getElementById('project-count').textContent = portfolio.projects.length;
  document.getElementById('skills-count').textContent = portfolio.projects.length + 2;

  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';
  portfolio.projects.forEach((project) => projectList.appendChild(createProjectCard(project)));

  const contactList = document.getElementById('contact-list');
  contactList.innerHTML = '';
  portfolio.contacts.forEach((contact) => contactList.appendChild(createContactCard(contact)));
}

function loadPortfolio() {
  fetch('http://localhost:5000/api/portfolio')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((apiData) => {
      renderPortfolio(apiData);
    })
    .catch(() => {
      renderPortfolio(state.portfolio);
    });
}

window.addEventListener('DOMContentLoaded', loadPortfolio);
