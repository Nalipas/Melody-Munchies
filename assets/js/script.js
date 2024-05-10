const SearchInput = document.querySelector('#SearchInput');
const search = document.querySelector('#search-button');

search.addEventListener('click', function (event) {
  event.preventDefault();

  // create user object from submission
  const user = {
    Search: SearchInput.value.trim(),
  };

  // set new submission to local storage
  localStorage.setItem('user', JSON.stringify(user));
});

