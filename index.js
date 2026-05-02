const baseUrl = 'https://restcountries.com/v3.1';
const byNameBtn = document.getElementById('name-search');
const byCodeBtn = document.getElementById('code-search');
const byCapitalBtn = document.getElementById('capital-search');
const byDemonymBtn = document.getElementById('demonym-search');

const getCountryByName = async () => {
    const name = document.getElementById('search-bar').value;
    const byNameEndpoint = '/name/';
    const urlToFetch = `${baseUrl}${byNameEndpoint}${name}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const countryInfo = await response.json();
            console.log(countryInfo);
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
            console.log(countryInfo);
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
            console.log(countryInfo);
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
            console.log(countryInfo);
            return countryInfo;
        }
    } catch (error) {
        console.log(error);
    }
}

byNameBtn.onclick = async function() {
    const countryInfo = await getCountryByName();
    displayCountryInfo(countryInfo);
}
byCodeBtn.onclick = async function() {
    const countryInfo = await getCountryByCode();
    displayCountryInfo(countryInfo);

}
byCapitalBtn.onclick = async function() {
    const countryInfo = await getCountryByCapital();
    displayCountryInfo(countryInfo);
}
byDemonymBtn.onclick = async function() {
    const countryInfo = await getCountryByDemonym();
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
    const capital = country.capital.join(", ");
    const population = country.population;
    const currency = Object.values(country.currencies)[0].name;
    const continent = country.continents.join(", ");
    const border = country.borders.join(", ");
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
}