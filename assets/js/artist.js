
async function getArtistDetails(searchTerm){
    // const url = `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/?id=2396871`;
    const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchTerm}&per_page=10&page=1`;
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
        // return result
        const lyricsID = result.hits[0].result.id
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
            return lyricsResult;
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
    // const url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
}
//getArtistDetails()