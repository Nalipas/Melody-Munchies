/** DATA FIELDS **/

const search = $("#search-button");
const previousMusicSearches = $("#previousMusicSearches");
let musicHistory;

// Retrieves search results from Spotify based on user search query
function getSearchResults() {
  const searchInput = $("#searchInput");
  console.log(searchInput);
  const url = `https://cors-anywhere.herokuapp.com/https://spotify23.p.rapidapi.com/search/?q=${searchInput[0].value}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
  const spotifySearch = {
    async: true,
    crossDomain: true,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5cdbdb46f4mshcde17f8dbd80048p10af3fjsn0b917389a7cd",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
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
  $("#searchResults").empty();

  // Creates new div elements for each search result
  const results = $('<div class="columns" id="results">');
  // Iterates through the first 5 search results
  for (let i = 0; i <= 4; i++) {
    const trackId = data.tracks.items[i].data.id;
    const trackName = data.tracks.items[i].data.name;
    const albumArt =
      data.tracks.items[i].data.albumOfTrack.coverArt.sources[0].url;
    const artist = data.tracks.items[i].data.artists.items[0].profile.name;
    const albumName = data.tracks.items[i].data.albumOfTrack.name;
    const trackUrl = `https://open.spotify.com/track/${trackId}`;

    // Creates new 'trackCard' elements for each search result
    const trackCard = $(`
      <a href="${trackUrl}" target="_blank">
        <div class="card column">
            <img src="${albumArt}" class="column card-img-top is-medium" alt="Album Art"></a>
          <div class="card-body">
            <h5 class="card-title">${trackName}</h5>
            <p class="card-text">${artist}</p>
            <p class="card-text">${albumName}</p>
          </div>
        </div>
      </a>
  `);
    // Appends the trackCard to the results div
    results.append(trackCard);
  }
  // Appends the results div to the searchResults div
  $("#searchResults").append(results);
}

// Displays Music Search History

function displayMusicSearchHistory() {
  const musicSearchHistory =
    JSON.parse(localStorage.getItem("musicQueries")) || [];
  $("#previousMusicSearches").empty();

  if (musicSearchHistory.length === 0) {
    previousMusicSearches.css("border", "none");
  } else {
    previousMusicSearches.css("border", "1px solid black");
  }

  for (let i = 0; i < musicSearchHistory.length; i++) {
    const historyButton = $("<button>").text(musicSearchHistory[i]);
    $("#previousMusicSearches").append(historyButton);

    if (musicSearchHistory.length > 0) {
      musicQuery = musicSearchHistory[0];
      getSearchResults();
    }
  }
}

// Event listener for the search button

$("#search-button").on("click", function (event) {
  event.preventDefault();
  console.log("search button pressed");
  musicQuery = $("#searchInput").val();
  if (musicQuery.trim() !== "");
  {
    let musicHistory = JSON.parse(localStorage.getItem("musicQueries")) || [];
    if (!musicHistory.includes(musicQuery)) {
      musicHistory.unshift(musicQuery);
      const maxHistory = 5;
      if (musicHistory.length > maxHistory) {
        musicHistory.pop();
      }
      localStorage.setItem("musicSearchHistory", JSON.stringify(history));
      displayMusicSearchHistory();
      getSearchResults();
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});