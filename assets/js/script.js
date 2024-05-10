  /** DATA FIELDS **/
const SearchInput = document.querySelector('#SearchInput');
const search = document.querySelector('#search-button');

const spotifySearch = {
	async: true,
	crossDomain: true,
	url: 'https://spotify-scraper.p.rapidapi.com/v1/search?term=${SearchInput.value}',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8b0f6327b4msh023252b9681cd48p15ed04jsn5cb8133c35a7',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

$.ajax(spotifySearch).done(function (response) {
	console.log(response);
}); 

const trackData = {
	async: true,
	crossDomain: true,
	url: 'https://spotify-scraper.p.rapidapi.com/v1/track/metadata?trackId=5ubHAQtKuFfiG4FXfLP804',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8b0f6327b4msh023252b9681cd48p15ed04jsn5cb8133c35a7',
		'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
	}
};

$.ajax(trackData).done(function (response) {
	console.log(response);
});
 
function getSearchResults(){
  fetch (spotifySearch)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displaySearchResults(data);
    });
}

function displaySearchResults(data) {
  $('#searchResults').empty();

  const results = $('<div id="results">');

  for (let i = 0; i <= 4; i++) {
    const track = data.tracks.items[i];
    const album = track.album;
    const albumArt = album.images[0].url;
    const trackName = track.name;
    const artist = track.artists[0].name;
    const albumName = album.name;
    const releaseDate = album.release_date;
    const trackId = track.id;
    const trackUrl = `https://open.spotify.com/track/${trackId}`;

    const trackCard = $(`
      <div class="card">
        <img src="${albumArt}" class="card-img-top" alt="Album Art">
        <div class="card-body">
          <h5 class="card-title">${trackName}</h5>
          <p class="card-text">${artist}</p>
          <p class="card-text">${albumName}</p>
        </div>
  `)

    results.append(trackCard);
  }

  $('#searchResults').append(results);
};


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


