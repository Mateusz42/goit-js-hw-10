import Notiflix from 'notiflix';

export async function fetchCountries(name) {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${name}?fields=name,flags.svg,capital,population,languages`);
    if (!response.ok) {
      throw new Error('Country not found');
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    throw new Error('Error fetching countries');
  }
}