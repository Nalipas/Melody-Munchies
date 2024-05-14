  /** DATA FIELDS **/
  console.log(mockData);
const searchInput = document.querySelector('#searchInput');
const search = document.querySelector('#search-button');
const previousSearches = document.querySelector('#previousSearches');

// ------- hoisting getArtistDetails()

async function getArtistDetails(searchTerm){
  // const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871`;
  let perPage = 5;
  const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchTerm}&per_page=${perPage}&page=1`;
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': 'eabcfc5b26msh2a8b38230c5fa40p11fd25jsnad44bd1aa8cb',
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
  };
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      let results = [];
      for (let i = 0; i < result.hits.length; i++) {
        // return each hit/result
        const lyricsID = result.hits[i].result.id
        const lyricsURL = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=${lyricsID}&text_format=plain`;
        const lyricsOptions = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'eabcfc5b26msh2a8b38230c5fa40p11fd25jsnad44bd1aa8cb',
                'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
        };
        try {
            const lyricsResponse = await fetch(lyricsURL, lyricsOptions);
            const lyricsResult = await lyricsResponse.text();
            console.log(lyricsResult);
            // return lyricsResult;
            results.push(lyricsResult);
        } catch (error) {
            console.error(error);
        }
      }
      return results;
  } catch (error) {
      console.error(error);
  }
  // const url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
}

// -------

// $.ajax(trackData).done(function (response) {
//	console.log(response);
//});

function getSearchResults(){
  const url =`https://cors-anywhere.herokuapp.com/https://spotify-scraper.p.rapidapi.com/v1/search?term=${searchInput.value}`;
  const spotifySearch = {
    // async: true,
    // crossDomain: true,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5cdbdb46f4mshcde17f8dbd80048p10af3fjsn0b917389a7cd',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
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

function getSearchResultsMock(){
  // const url =`https://cors-anywhere.herokuapp.com/https://spotify-scraper.p.rapidapi.com/v1/search?term=${searchInput.value}`;
  // const spotifySearch = {
  //   // async: true,
  //   // crossDomain: true,
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '5cdbdb46f4mshcde17f8dbd80048p10af3fjsn0b917389a7cd',
  //     'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
  //   }
  // };

  // fetch(url, spotifySearch)
  //   .then(function (response) {
  //     console.log(response);
  //     return response.json();
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //     displaySearchResults(data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
//     });

displaySearchResults(mockData);
}

function displaySearchResults(data) {
  $('#searchResults').empty();

  const results = $('<div class="columns" id="results">');

  for (let i = 0; i <= 4; i++) {
    const track = data.tracks.items[i];
    const album = track.album;
    const albumArt = album.cover[0].url;
    const trackName = track.name;
    const artist = track.artists[0].name;
    const albumName = album.name;
    const trackId = track.id;
    const trackUrl = `https://open.spotify.com/track/${trackId}`;

    const trackCard = $(`
      <div class="card column">
        <img src="${albumArt}" class="column card-img-top is-small" alt="Album Art">
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


const getSelectedTrackInfo = function(trackId) {
  const url = `https://cors-anywhere.herokuapp.com/https://spotify-scraper.p.rapidapi.com/v1/track/metadata?trackId=${trackId}`;
  const spotifySearch = {
    // async: true,
    // crossDomain: true,
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '5cdbdb46f4mshcde17f8dbd80048p10af3fjsn0b917389a7cd',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  };
}

search.addEventListener('click', async function (event) {
  event.preventDefault();
  //getSearchResultsMock();
  const result = await getArtistDetails(searchInput.value.trim())
  console.log(result);
  const lyricsSection = document.getElementById("lyricsContainer");
  for (let index = 0; index < result.length; index++) {
    const element = JSON.parse(result[index]); // each hit becomes JSON obj
    const newArticle = document.createElement('article'); // a new article tag
    const songLyrics = document.createElement('p'); // a paragraph tag
    const songTitle = document.createElement('h3'); // an h3 tag
    const songArtist = document.createElement('h4'); // an h4 tag
    songArtist.textContent = element.lyrics.tracking_data.primary_artist; // the artist
    songTitle.textContent = element.lyrics.tracking_data.title; // the song title
    songLyrics.textContent = element.lyrics.lyrics.body.plain; // the chunk of lyrics
    newArticle.appendChild(songTitle); // add title to article
    newArticle.appendChild(songArtist); // add artist to article
    newArticle.appendChild(songLyrics); // add lyrics to article
    lyricsSection.appendChild(newArticle);
    const humanResources = document.createElement("hr");
    lyricsSection.appendChild(humanResources);
  }
  // document.body.textContent = result;
    let user = JSON.parse(localStorage.getItem('user'));
  if (!user) 
  {
    user = {
      search: [ ]
    };
    }
  // create user object from submission
    user.search.push(searchInput.value.trim())
    
  // set new submission to local storage
  localStorage.setItem('user', JSON.stringify(user));
});

// Retrieve Searchs and SearchId from localStorage
let previousSeraches = JSON.parse(localStorage.getItem("user"));
if (previousSeraches === null) {
  previousSeraches = [];
}

let SearchId = JSON.parse(localStorage.getItem("SearchId"))
  ? JSON.parse(localStorage.getItem("SearchId"))
  : [];


