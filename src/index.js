import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const renderCountryList = countries => {
    const markup = countries.map(country => `
        <li class="country-item">
            <img src="${country.flags.svg}" alt="Flag of ${country.name.official}">
            <p>${country.name.official}</p>
        </li>
    `).join('');
    countryList.innerHTML = markup;
};

const renderCountryInfo = country => {
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'No official languages';
  const markup = `
      <div>
          <img src="${country.flags.svg}" alt="Flag of ${country.name.official}">
          <h2>${country.name.official}</h2>
          <p>Capital: ${country.capital}</p>
          <p>Population: ${country.population.toLocaleString()}</p>
          <p>Languages: ${languages}</p>
      </div>
  `;
  countryInfo.innerHTML = markup;
};

const debouncedInputHandler = debounce(async event => {
    const { value } = event.target;
    if (value.trim() === '') {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }
    try {
     const countries = await fetchCountries(value.trim());
        if (countries.length > 10) {
            Notiflix.Notify.Info("Too many matches found. Please enter a more specific name.");
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
        } else if (countries.length === 1) {
            renderCountryInfo(countries[0]);
            countryList.innerHTML = '';
        } else if (countries.length > 0 && countries.length <= 10) {
            renderCountryList(countries);
            countryInfo.innerHTML = '';
        } else {
            Notiflix.Notify.Failure("No matches found. Please try a different name.");
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
        }
    } catch (error) {
        Notiflix.Notify.Failure("Error searching for the country. Please try again.");
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
    }
}, 300);
searchBox.addEventListener('input', debouncedInputHandler);
