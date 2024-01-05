import Notiflix from 'notiflix';
export async function fetchCountries(name) {
  const baseUrl = 'https://restcountries.com/v3.1/name/';
  const queryParams = '?fields=name,official,capital,population,flags,lnguages';
  try {
      const response = await fetch(`${baseUrl}${name}${queryParams}`);
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
