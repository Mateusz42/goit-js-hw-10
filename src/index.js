import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.querySelector('#search-box');

const handleSearch = debounce(async () => {
  const searchTerm = searchBox.value.trim();
  
  if (searchTerm === '') {
   return;
  }

  try {
    const countries = await fetchCountries(searchTerm);
    
    if (countries.length === 0) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
  
    } else if (countries.length > 10) {
      Notiflix.Notify.failure('Too many matches found. Please enter a more specific name.');
    
    } else if (countries.length >= 2 && countries.length <= 10) {
  
    } else {
  
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}, 300);

searchBox.addEventListener('input', handleSearch);