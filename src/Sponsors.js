import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { API_URL } from './App';

/**
 * Sponsor image component
 * @param src a source url to load the image from
 * @param alt an alternative text to display on the image
 * @param updateLoading a method to update the loading state of current image to parent component
 * @returns {JSX.Element} img with given src and alt
 */
const SponsorImage = ({ src, alt, updateLoading }) => {
  return (<>
    <img src={src} alt={alt} onLoad={() => {updateLoading(false)}}/>
  </>);
};

/**
 * A component to display sponsor images
 * @param isLoading a method to update the loading state of all images to parent component
 * @returns {JSX.Element} sponsor images in a marquee
 */
const Sponsors = ({ isLoading }) => {
  const [ images, setImages ] = useState([]);
  const [ imagesLoading, setImagesLoading ] = useState([]);

  /**
   * Fetch image urls
   */
  useEffect(() => {
    fetch(API_URL + '/sponsors')
      .then(res => res.json())
      .then(images => {
        setImages(images);
        setImagesLoading(Array(images.length).fill(true));
      });
  }, []);

  /**
   * Check that all the images are loaded
   * Then set isLoading to true to handle it in the parent component
   */
  useEffect(() => {
    if (imagesLoading.length > 0 && imagesLoading.every(el => el === false)) {
      isLoading(false);
    }
  }, [ imagesLoading ]);

  /**
   * Update the loading status of a single image by index
   * @param index the index of the image to update the loading status of
   * @returns {(function(*): void)|*} a new array containing all image loading statuses
   */
  const updateLoading = (index) => (newLoading) => {
    setImagesLoading(prevLoading => {
      prevLoading[index] = newLoading;
      return [...prevLoading];
    });
  }

  return (
    <div id="sponsors">
      <h2>Sponsored by</h2>
      <div id="sponsorsLogos">
        {images.length > 0 && <Marquee
          gradientColor={[0, 0, 0]}
          speed={30}
        >
          {images.map((image, i) => (
            <SponsorImage key={i} src={image} alt={`img-${i}`} loading={imagesLoading[i]} updateLoading={updateLoading(i)} />
          ))}
        </Marquee>}
      </div>
    </div>
  );
}

export default Sponsors;
