const recipeInput = $("#recipeInput");

function getRecipeResults() {
	const recipeInput = $("#recipeInput");
	console.log(recipeInput);
	const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=${recipeInput[0].value}`;
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

//Displays search resuts in the search result section on the page
function displaygetRecipeResults(data) {
	$('#recipeResults').empty();

	const recipes = $("<div class='columns' id='recipe'/>");
	//the first 5 search result will show up


	for (let i = 0; i <= 4; i++) {
		const recipeName = data.results[i].slug;
		const recipeNameClean = data.results[i].name;
		const recipePicture = data.results[i].thumbnail_url;
		const recipeURL = `https://tasty.co/recipe/${recipeName}`;
		//Creates new 'recipeCard' elements for each search results 
		const recipeCard = $(`
			<div class="card column">
				<a href="${recipeURL}" target="_blank">
					<img src="${recipePicture}" class="column card-img-top is-medium" alt="Album Art"></a>
					<div class="card-body">
						<h5 class="card-title">${recipeNameClean}</h5>
					</div>
			</div>
		`);
		// append the recipeCard to the results div
		recipes.append(recipeCard);
	}
	//appends the results dib to recipeResults div
	$('#recipeResults').append(recipes)
};

$("#recipeSearchButton").on("click", function (event) {
	event.preventDefault();
	console.log("recipe button pressed");
	getRecipeResults();
});



