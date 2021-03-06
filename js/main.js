var elList = document.querySelector('.list');
var elForm = document.querySelector('.form');
var elFormSelect = document.querySelector('.form-select');

elList.innerHTML = null;

var resultGender = [];

for (film of films) {
	for (var genre of film.genres){
		if(!resultGender.includes(genre)){
			resultGender.push(genre);
		}
	}
}

for (var option of resultGender) {
	var elOption = document.createElement('option');
	elOption.value = option;
	elOption.textContent = option;

	elFormSelect.appendChild(elOption)
}


function renderFilms(arr, node) {
	elList.innerHTML = null;

	arr.forEach((film) => {
		if(film.genres.includes(elFormSelect.value)){
			var newLi = document.createElement('li');
			var newHeading = document.createElement('h3');
			var newImage = document.createElement('img');
			var newParagraph = document.createElement('p');
			var newTime = document.createElement('time');
			var newGenreList = document.createElement('ul');
	
			newHeading.textContent = film.title;
			newParagraph.textContent =
				film.overview.split(' ').slice(0, 10).join(' ') + '...';
			newTime.textContent = normalizeDate(film.release_date);
	
			for (var genre of film.genres) {
				var newGenreLi = document.createElement('li');
				newGenreLi.textContent = genre;
				newGenreList.appendChild(newGenreLi);
			}
	
			newLi.setAttribute('class', 'list__item film list-unstyled m-0 mb-5');
			newHeading.setAttribute('class', 'film__heading');
			newImage.setAttribute('class', 'film__image');
			newImage.setAttribute('src', film.poster);
			newImage.setAttribute('alt', film.title + ' poster');
			newGenreList.setAttribute('class', 'genre-li list-unstyled p-0 m-0');
			newImage.setAttribute('width', '200');
			newImage.setAttribute('height', '200');
	
			newLi.appendChild(newHeading);
			newLi.appendChild(newImage);
			newLi.appendChild(newParagraph);
			newLi.appendChild(newTime);
			newLi.appendChild(newGenreList);
	
			node.appendChild(newLi);
		}
	});
}

renderFilms(films, elList);

// form

elForm.addEventListener('submit', (evt)=>{
	evt.preventDefault();

	renderFilms(films, elList);
})