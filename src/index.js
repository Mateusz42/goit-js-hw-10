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
    
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}, 300);

searchBox.addEventListener('input', handleSearch);