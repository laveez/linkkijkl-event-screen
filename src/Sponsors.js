import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import Spinner from './Spinner';
import { API_URL } from './App';

const SponsorImage = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (<>
    {loading && <Spinner size={50}/>}
    <img src={src} alt={alt} width={200} style={{margin: '0 100px 0'}} onLoad={() => setLoading(false)}/>
  </>);
};

const Sponsors = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(API_URL + '/sponsors')
      .then(res => res.json())
      .then(setImages);
  }, [images.length]);

  return (
    <div id="sponsors">
      <h2>Sponsored by:</h2>
      <div id="sponsorsLogos">
        {!images.length > 0 && <Spinner size={50}/>}
        {images.length > 0 && <Marquee
          gradient={false}
          speed={30}
        >
          {images.map((image, i) => (
            <SponsorImage key={i} src={image} alt={`img-${i}`}/>
          ))}
        </Marquee>}
      </div>
    </div>
  );
}

export default Sponsors;
