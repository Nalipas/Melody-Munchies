  /** DATA FIELDS **/
const SearchInput = document.querySelector('#SearchInput');
const search = document.querySelector('#search-button');

search.addEventListener('click', function (event) {
  event.preventDefault();
  
  let user = JSON.parse(localStorage.getItem('user'));
  if (!user) 
  {
    user = {
      search: [ ]
    };
    }
  // create user object from submission
    user.search.push(SearchInput.value.trim())
    
  // set new submission to local storage
  localStorage.setItem('user', JSON.stringify(user));
});

// Retrieve Searchs and SearchId from localStorage
let PreviousSearchs = JSON.parse(localStorage.getItem("user"));
if (PreviousSearchs === null) {
  PreviousSearchs = [];
}

let SearchId = JSON.parse(localStorage.getItem("SearchId"))
  ? JSON.parse(localStorage.getItem("SearchId"))
  : [];


