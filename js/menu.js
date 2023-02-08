export {changeTheme};

const changeTheme = e => {
  if (document.body.classList.value === 'light') {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    return;
  }
  document.body.classList.remove('dark');
  document.body.classList.add('light');
  localStorage.setItem('theme', 'light');
};

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
