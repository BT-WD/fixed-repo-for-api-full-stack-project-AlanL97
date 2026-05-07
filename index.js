const baseUrl = 'https://restcountries.com/v3.1';
const byNameBtn = document.getElementById('name-search');
const byCodeBtn = document.getElementById('code-search');
const byCapitalBtn = document.getElementById('capital-search');
const byDemonymBtn = document.getElementById('demonym-search');

const favoriteButton = document.createElement("button");
favoriteButton.setAttribute("id", "favorite-button");
favoriteButton.setAttribute("class", "favorite-button");
favoriteButton.innerHTML = "Add to Favorites";
if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", "");
}
const displayFavoritesButton = document.getElementById("display-favorites");
const resetFavoritesButton = document.getElementById("reset-favorites");


let countryInfo = "";

const getCountryByName = async () => {
    const name = document.getElementById('search-bar').value;
    const byNameEndpoint = '/name/';
    const urlToFetch = `${baseUrl}${byNameEndpoint}${name}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countryInfo = await response.json();
            return countryInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

const getCountryByCode = async () => {
    const code = document.getElementById('search-bar').value;
    const byCodeEndpoint = '/alpha/';
    const urlToFetch = `${baseUrl}${byCodeEndpoint}${code}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countryInfo = await response.json();
            return countryInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

const getCountryByCapital = async () => {
    const capital = document.getElementById('search-bar').value;
    const byCapitalEndpoint = '/capital/';
    const urlToFetch = `${baseUrl}${byCapitalEndpoint}${capital}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countryInfo = await response.json();
            return countryInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

const getCountryByDemonym = async () => {
    const demonym = document.getElementById('search-bar').value;
    const byDemonymEndpoint = '/demonym/';
    const urlToFetch = `${baseUrl}${byDemonymEndpoint}${demonym}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countryInfo = await response.json();
            return countryInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

byNameBtn.onclick = async function() {
    countryInfo = await getCountryByName();
    displayCountryInfo(countryInfo);
}
byCodeBtn.onclick = async function() {
    countryInfo = await getCountryByCode();
    displayCountryInfo(countryInfo);

}
byCapitalBtn.onclick = async function() {
    countryInfo = await getCountryByCapital();
    displayCountryInfo(countryInfo);
}
byDemonymBtn.onclick = async function() {
    countryInfo = await getCountryByDemonym();
    displayCountryInfo(countryInfo);
}

const displayCountryInfo = async (countryInfo) => {
    const flagImg = document.createElement("img");
    const countryInfoP = document.createElement("p");
    countryInfoP.setAttribute("id", "country-info");
    const flagDiv = document.getElementById("flag");
    const factsDiv = document.getElementById("country-facts")
    flagDiv.innerHTML = "";
    factsDiv.innerHTML = "";

    if (!countryInfo || countryInfo.length === 0) {
        countryInfoP.innerHTML = "No country found";
        factsDiv.appendChild(countryInfoP);
        return;
    }

    const country = countryInfo[0];

    const countryFlag = country.flags.png;
    flagImg.setAttribute("src", countryFlag);
    flagDiv.appendChild(flagImg);

    const commonCountryName = country.name.common;
    const officialCountryName = country.name.official;
    const capital = country.capital ? country.capital.join(", ") : "None";
    const population = country.population;
    const currency = country.currencies ? Object.values(country.currencies)[0].name : "None";
    const continent = country.continents.join(", ");
    const border = country.borders ? country.borders.join(", ") : "None";
    const language = Object.values(country.languages).join(", ");
    const demonym = country.demonyms.eng.m;

    countryInfoP.innerHTML = `
        Common Name: ${commonCountryName}<br>
        Official Name: ${officialCountryName}<br>
        Capital: ${capital}<br>
        Population: ${population}<br>
        Currency: ${currency}<br>
        Continent: ${continent}<br>
        Borders: ${border}<br>
        Languages: ${language}<br>
        Demonym: ${demonym}
    `;
    factsDiv.appendChild(countryInfoP);
    factsDiv.appendChild(favoriteButton);
}

const addToFavorites = (countryInfo) => {
    let favoritesList;
    try {
        favoritesList = JSON.parse(localStorage.getItem("favorites"));
    } catch {
        favoritesList = [];
    }
    favoritesList.push(countryInfo[0].name.common);
    localStorage.setItem("favorites", JSON.stringify(favoritesList));
}

favoriteButton.onclick = function() {
    addToFavorites(countryInfo);
}

const displayFavorites = () => {
    const factsDiv = document.getElementById("country-facts");
    const flagDiv = document.getElementById("flag");
    const favorites = document.createElement("p");
    const header = document.createElement("h3");
    header.innerHTML = "Favorite Countries";
    let favoritesList;

    factsDiv.innerHTML = "";
    flagDiv.innerHTML = "";

    try {
        favoritesList = JSON.parse(localStorage.getItem("favorites")).join("<br>");
    } catch (error) {
        favorites.innerHTML = "No favorites";
        factsDiv.appendChild(favorites);
        return;
    }

    favorites.innerHTML = `${favoritesList}`;
    factsDiv.appendChild(header);
    factsDiv.appendChild(favorites);
}

const resetFavorites = () => {
    localStorage.setItem("favorites", "");
}

displayFavoritesButton.onclick = displayFavorites;
resetFavoritesButton.onclick = resetFavorites;