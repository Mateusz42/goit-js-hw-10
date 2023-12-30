import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const handleSearch = debounce(async () => {
  const searchTerm = searchBox.value.trim();

  if (searchTerm === '') {
    clearUI();
    return;
  }

  try {
    const countries = await fetchCountries(searchTerm);

    if (countries.length > 10) {
      Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
      clearUI();
    } else if (countries.length >= 2 && countries.length <= 10) {
      displayCountryList(countries);
      clearCountryInfo();
    } else if (countries.length === 1) {
      displayCountryInfo(countries[0]);
      clearCountryList();
    } else {
      clearUI();
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearUI();
  }
}, 300);

function clearUI() {
  clearCountryList();
  clearCountryInfo();
}

function clearCountryList() {
  countryList.innerHTML = '';
}

function clearCountryInfo() {
  countryInfo.innerHTML = '';
}

function displayCountryList(countries) {
  clearCountryInfo();
  countryList.innerHTML = '';

  countries.forEach(country => {
    const countryElement = document.createElement('div');
    countryElement.classList.add('country');
    countryElement.innerHTML = `<img src="${country.flags.svg}" alt="${country.name.official}" /> <span>${country.name.official}</span>`;
    countryList.appendChild(countryElement);
  });
}

function displayCountryInfo(country) {
  clearCountryList();
  countryInfo.innerHTML = '';

  const countryElement = document.createElement('div');
  countryElement.classList.add('country-details');
  countryElement.innerHTML = `
    <img src="${country.flags.svg}" alt="${country.name.official}" />
    <h2>${country.name.official}</h2>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <p><strong>Languages:</strong> ${country.languages.map(lang => lang.name).join(', ')}</p>
  `;
  countryInfo.appendChild(countryElement);
}

searchBox.addEventListener('input', handleSearch);
