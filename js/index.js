console.log('hi');

const URL_PREFIX = 'http://localhost:3000/';
let page = 1;

// Fetch and display monsters
const getMonsters = (page) => {
  console.log(`Fetching monsters for page: ${page}`);
  fetch(URL_PREFIX + `monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
      document.querySelector('#monster-container').innerHTML = '';
      for (let i = 0; i < monsters.length; i++) {
        console.log('monster', monsters[i]);
        createMonsterCard(monsters[i]);
      }
    })
    .catch(error => console.error('Error fetching monsters:', error));
};

// Create and display monster card
const createMonsterCard = (monster) => {
  let div = document.createElement('div');
  div.classList.add('monster');

  let h2 = document.createElement('h2');
  let h4 = document.createElement('h4');
  let p = document.createElement('p');

  h2.innerHTML = `${monster.name}`;
  h4.innerHTML = `Age: ${monster.age}`;
  p.innerHTML = `Bio: ${monster.description}`;

  div.appendChild(h2);
  div.appendChild(h4);
  div.appendChild(p);
  document.querySelector('#monster-container').appendChild(div);
};

// Create monster form
const createMonsterForm = () => {
  const form = document.createElement('form');
  const nameInput = document.createElement('input');
  const ageInput = document.createElement('input');
  const descriptionInput = document.createElement('input');
  const button = document.createElement('button');

  form.id = 'monster-form';
  nameInput.id = 'name';
  ageInput.id = 'age';
  descriptionInput.id = 'description';

  nameInput.placeholder = 'name...';
  ageInput.placeholder = 'age...';
  descriptionInput.placeholder = 'description...';
  button.innerHTML = 'Create';

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(button);

  document.getElementById('create-monster').appendChild(form);
  addSubmitEventListener();
};

// Handle form submission
const addSubmitEventListener = () => {
  document.querySelector('#monster-form').addEventListener('submit', event => {
    event.preventDefault(); // Prevent page refresh
    console.log('submitted', getFormData());
    postNewMonster(getFormData());
  });
};

// Get form data
const getFormData = () => {
  let name = document.querySelector('#name').value;
  let age = parseFloat(document.querySelector('#age').value);
  let description = document.querySelector('#description').value;

  return { name, age, description };
};

// Post new monster to API
const postNewMonster = (monster) => {
  let url = URL_PREFIX + `monsters`;
  let config = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(monster)
  };

  fetch(url, config)
    .then(response => response.json())
    .then(newMonster => {
      console.log('new monster', newMonster);
      createMonsterCard(newMonster); // Add the new monster to the DOM
      clearForm();
    })
    .catch(error => console.error('Error posting new monster:', error));
};

// Clear form
const clearForm = () => {
  document.querySelector('#monster-form').reset();
};

// Add navigation listeners
const addNavListeners = () => {
  let backButton = document.querySelector('#back');
  let forwardButton = document.querySelector('#forward');

  backButton.addEventListener('click', () => {
    pageDown();
  });
  forwardButton.addEventListener('click', () => {
    pageUp();
  });
};

// Page navigation
const pageUp = () => {
  page++;
  console.log(`Page up, new page: ${page}`);
  getMonsters(page);
};

const pageDown = () => {
  if (page > 1) {
    page--;
    console.log(`Page down, new page: ${page}`);
    getMonsters(page);
  } else {
    alert('Ain\'t no monsters here');
  }
};

// Initialize
const init = () => {
  console.log('Initializing app');
  getMonsters(page);
  createMonsterForm();
  addNavListeners();
};

document.addEventListener('DOMContentLoaded', init);
