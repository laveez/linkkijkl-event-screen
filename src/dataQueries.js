import { API_URL } from './App';
import { useCallback, useEffect, useState } from 'react';
import algoBg from './algo_bg.png'
import linkkiBg from './linkki_bg.png'

/**
 * Sends a keepalive request to the API to keep the server alive
 * @returns {Promise<void>} a promise that resolves when the request is successful
 */
export const keepAlive = () => {
  return fetch(API_URL + '/keep-alive').then(/* Do nothing */);
};

/**
 * Fetches lunch data from the API
 * @param route a route to fetch the lunch from, e.g. 'piato' or 'maija'
 * @returns {Promise<unknown>} a promise that resolves with the fetched data
 */
export const getLunchData = route => {
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
export const getEventData = route => {
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
export const getSponsors = route => {
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

/**
 * Custom hook to fetch data from the API
 * Fetches data from the given fetch functions and sets the data and loading state
 * Also preloads images before setting the loading state to false
 * @param fetchFunctions an object containing functions to fetch data
 * @returns {[{},boolean]} an array containing the fetched data and loading state
 */
export const useFetchData = fetchFunctions => {
  const [ data, setData ] = useState({});
  const [ isLoading, setIsLoading ] = useState(true);

  /**
   * Loads an image from the given image url and calls the onLoad function when the image is loaded
   * @param imageUrl an image url
   * @param onLoad a function to call when the image is loaded
   * @returns {void}
   * @type {(function(*, *): void)|*}
   */
  const loadImage = useCallback((imageUrl, onLoad) => {
    const img = new Image();
    img.onload = onLoad;
    img.src = imageUrl;
  }, []);

  /**
   * Preloads images from the given image urls and calls the onAllImagesLoaded function when all images are loaded
   * @param imageUrls an array of image urls
   * @param onAllImagesLoaded a function to call when all images are loaded
   * @returns {void}
   * @type {(function(*, *): void)|*}
   */
  const loadImages = useCallback((imageUrls, onAllImagesLoaded) => {
    let imagesLoaded = 0;
    imageUrls.forEach(imageUrl => {
      loadImage(imageUrl, () => {
        imagesLoaded++;
        if (imagesLoaded === imageUrls.length) {
          onAllImagesLoaded();
        }
      });
    });
  }, [ loadImage ]);

  /**
   * Handles fetched data by setting the data and preloading images
   * @param fetchedData an array of fetched data
   * @returns {void}
   * @type {(function(*): void)|*}
   */
  const handleFetchData = useCallback(fetchedData => {
    const fetchedDataObj = Object.fromEntries(fetchedData);
    setData(fetchedDataObj);

    const sponsorImages = [ ...fetchedDataObj.linkkiSponsors, ...fetchedDataObj.algoSponsors ];
    const bgImages = [ algoBg, linkkiBg ];

    loadImages([ ...sponsorImages, ...bgImages ], () => setIsLoading(false));
  }, [ loadImages ]);

  /**
   * Fetches data from the given fetch functions
   * Sets the loading state to true when fetching data
   * Sets the loading state to false when all data is fetched or when an error occurs
   */
  useEffect(() => {
    setIsLoading(true);
    Promise.all(Object.entries(fetchFunctions).map(([ key, fn ]) =>
      fn().then(result => [ key, result ]).catch(()  => {
        return [ key, [] ]; // return default value for failed fetch function
      })))
      .then(handleFetchData)
      .catch(() => {
        setIsLoading(false);
      });
  }, [ fetchFunctions, handleFetchData ]);

  return [ data, isLoading ];
}
