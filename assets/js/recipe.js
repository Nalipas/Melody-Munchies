
function getRecipeResults() {
	const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
	const tastySearch = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0c084aaebdmshde1e3295c4cd197p1b18ebjsn143719785bc7',
			'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
		}
	};
	fetch(url, tastySearch)
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			displaygetRecipeResults(data);
		})

		.catch(function (error) {
			console.log(error);
		});
}
getRecipeResults();

//Displays search resuts in the search result section on the page
function displaygetRecipeResults(data) {
	$('#recipeResults').empty();

	const recipes = $("<div class='columns' id='recipe'/>");
	//the first 5 search result will show up


	for (let i = 0; i <= 4; i++) {
		const recipeName = data.results[i].slug;
		const recipePicture = data.results[i].thumbnail_url;
		const actualRecipe = data.results[i].instructions;
		const recipeVideo = data.results[i].video_url;
		const recipeURL = `https://tasty.p.rapidapi.com/recipes/${recipeName}`;
		//Creates new 'recipeCard' elements for each search results 
		const recipeCard = $(`
<div class="card column">
  <img src="${recipePicture}" class="column card-img-top is-medium" alt="Album Art">
  <div class="card-body">
	<h5 class="card-title">${recipeName}</h5>
	<video> <source src=${recipeVideo}/>  </video>
	<p class="card-text"><ul>${actualRecipe.map((step) => { return `<li> ${step.display_text}</li>` })}</ul></p>
  </div>
`);
		// append the recipeCard to the results div
		recipes.append(recipeCard);



	}




	//appends the results dib to recipeResults div
	$('#recipeResults').append(recipes)
};




