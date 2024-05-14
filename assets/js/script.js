/** DATA FIELDS **/

const searchInput = document.querySelector('#searchInput');
const search = document.querySelector('#search-button');
const previousSearches = document.querySelector('#previousSearches');


// Retrieves search results from Spotify based on user search query
function getSearchResults(){
  const url =`https://cors-anywhere.herokuapp.com/https://spotify23.p.rapidapi.com/search/?q=${searchInput.value}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const spotifySearch = {
    async: true,
    crossDomain: true,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5cdbdb46f4mshcde17f8dbd80048p10af3fjsn0b917389a7cd',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  };

  fetch(url, spotifySearch)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displaySearchResults(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Displays search results in the search results section on the page
function displaySearchResults(data) {
  $('#searchResults').empty();

  // Creates new div elements for each search result
  const results = $('<div class="columns" id="results">');
  // Iterates through the first 5 search results
  for (let i = 0; i <= 4; i++) {
    const trackId = data.tracks.items[i].data.id;
    const trackName = data.tracks.items[i].data.name;
    const albumArt = data.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url;
    const artist = data.tracks.items[i].data.artists.items[0].profile.name;
    const albumName = data.tracks.items[i].data.albumOfTrack.name;
    const trackUrl = `https://open.spotify.com/track/${trackId}`;
    
    // Creates new 'trackCard' elements for each search result
    const trackCard = $(`
      <div class="card column">
        <img src="${albumArt}" class="column card-img-top is-medium" alt="Album Art">
        <div class="card-body">
          <h5 class="card-title">${trackName}</h5>
          <p class="card-text">${artist}</p>
          <p class="card-text">${albumName}</p>
        </div>
  `)
    // Appends the trackCard to the results div
    results.append(trackCard);
  }
  // Appends the results div to the searchResults div
  $('#searchResults').append(results);
};

// Event listener for the search button
search.addEventListener('click', function (event) {
  event.preventDefault();
  getSearchResults();
    let user = JSON.parse(localStorage.getItem('user'));
  if (!user) 
  {
    user = {
      search: [ ]
    };
    }
  // Creates user object from submission
    user.search.push(searchInput.value.trim())
    
  // Sets new submission to local storage
  localStorage.setItem('user', JSON.stringify(user));
});

// Retrieves searches and searchId from localStorage
let previousSeraches = JSON.parse(localStorage.getItem("user"));
if (previousSeraches === null) {
  previousSeraches = [];
}

let SearchId = JSON.parse(localStorage.getItem("SearchId"))
  ? JSON.parse(localStorage.getItem("SearchId"))
  : [];


