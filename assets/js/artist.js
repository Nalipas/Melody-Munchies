const url = 'https://wikipedia-api1.p.rapidapi.com/get_summary?q=Germany&lang=en&sentences=3';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c084aaebdmshde1e3295c4cd197p1b18ebjsn143719785bc7',
		'X-RapidAPI-Host': 'wikipedia-api1.p.rapidapi.com'
	}
};
async function getArtistDetails(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

}
getArtistDetails()