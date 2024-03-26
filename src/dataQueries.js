import { API_URL } from './App';

/**
 * Fetches lunch data from the API
 * @param route a route to fetch the lunch from, e.g. 'piato' or 'maija'
 * @returns {Promise<unknown>} a promise that resolves with the fetched data
 */
export const getLunchData = (route) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL + `/lunch/${route}`)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Fetches event data from the API
 * @param route a route to fetch the events from, e.g. 'linkki' or 'algo'
 * @returns {Promise<unknown>} a promise that resolves with the fetched data
 */
export const getEventData = (route) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL + `/events/${route}`)
      .then(response => response.json())
      .then(data => {
        resolve(data?.items);
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Fetches sponsors from the API
 * @param route a route to fetch the sponsors from, e.g. 'linkki' or 'algo'
 * @returns {Promise<unknown>} a promise that resolves with the fetched data
 */
export const getSponsors = (route) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL + `/sponsors/${route}`)
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
