const themeClick = document.querySelector('.theme');
const userContent = document.querySelector('.user-content');
const form = document.querySelector('form');
const input = document.querySelector('input');
const errorText = document.querySelector('.error-message');
const search = document.querySelector('.searchUser');

import {changeTheme} from './menu.js';

// Get API Response

const getUsers = async user => {
  const url = await fetch(`https://api.github.com/users/${user}`);
  const response = await url.json();
  if (response.message === 'Not Found') {
    errorMessage();
    return;
  }
  sendUsers(response);
};

// Send Users Infos in to Content

const sendUsers = response => {
  document.querySelector('.user-image').src = response.avatar_url;
  document.querySelector('.userName').textContent = response.name;
  document.querySelector('.userSign').textContent = `@${response.login}`;
  document.querySelector('.accountCreatedTime').textContent = fixDate(response.created_at);
  document.querySelector('.bio').textContent = response.bio;
  document.querySelector('.repostNumbers').textContent = response.public_repos;
  document.querySelector('.followersNumber').textContent = response.followers;
  document.querySelector('.followingNumber').textContent = response.following;
  document.querySelector('.location').textContent = containsItem(response.location);
  document.querySelector('.link').textContent = containsItem(response.html_url);
  document.querySelector('.twitter').textContent = containsItem(response.twitter_username);
  document.querySelector('.company').textContent = containsItem(response.company);
  input.value = '';
  userContent.style.display = 'flex';
  errorText.style.display = 'none';
};

// Show Users Content

const showUsers = e => {
  e.preventDefault();
  getUsers(input.value);
};

// Utilities Functions

const containsItem = value => (value === null ? (value = 'Not Available') : value);

const fixDate = item => {
  const time = new Date(item);
  const month = time.toLocaleString('default', {month: 'short'}).slice(0, -1);
  item = `Joined ${time.getDate()} ${month} ${time.getFullYear()}`;
  return item;
};

// Error Message

const errorMessage = () => {
  errorText.style.display = 'flex';
  userContent.style.display = 'none';
};

themeClick.addEventListener('click', changeTheme);
form.addEventListener('submit', showUsers);
search.addEventListener('click', showUsers);
