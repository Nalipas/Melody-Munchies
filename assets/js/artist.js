
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c084aaebdmshde1e3295c4cd197p1b18ebjsn143719785bc7',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};
async function getArtistDetails(searchTerm){
    const url = `https://spotify23.p.rapidapi.com/search/?q=${searchTerm}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return result
    } catch (error) {
        console.error(error);
    }

}
//getArtistDetails()