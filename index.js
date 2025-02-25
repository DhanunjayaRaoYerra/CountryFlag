let searchInputElement = document.getElementById("searchInput");
let resultsContainerElement = document.getElementById("resultsContainer");
let spinnerElement = document.getElementById("spinner");
let searchInputVal = "";
let countriesList = [];

function createAndAppend(country) {
    let listElement = document.createElement("div");
    listElement.classList.add("country-card", "col-11", "col-md-5", "mr-auto", "ml-auto", "d-flex", "flex-row");
    resultsContainerElement.appendChild(listElement);

    let imgContainer = document.createElement("img");
    imgContainer.src = country.flag;
    imgContainer.classList.add("country-flag", "mt-auto", "mb-auto");
    listElement.appendChild(imgContainer);

    let countryInfoElement = document.createElement("div");
    countryInfoElement.classList.add("d-flex", "flex-column", "ml-4");
    listElement.appendChild(countryInfoElement);

    let countryNameElement = document.createElement("p");
    countryNameElement.classList.add("country-name");
    countryNameElement.textContent = country.name;
    countryInfoElement.appendChild(countryNameElement);

    let countryPopulationElement = document.createElement("p");
    countryPopulationElement.classList.add("country-population");
    countryPopulationElement.textContent = country.population;
    countryInfoElement.appendChild(countryPopulationElement);
}

function displayResults() {
    resultsContainerElement.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.includes(searchInputVal)) {
            createAndAppend(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    spinnerElement.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerElement.classList.add("d-none");
            countriesList = jsonData;
            displayResults();
        });
}

getCountries();

function onChange() {
    searchInputVal = event.target.value;
    displayResults();
}
searchInputElement.addEventListener("keyup", onChange);