import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const Sponsors = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://linkkijkl.fi/', {headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      }})
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const imageElements = doc.querySelectorAll('.elementor-carousel-image');
        const imageUrls = [];
        for (let element of imageElements) {
          const style = element.getAttribute('style');
          const backgroundImageUrl = style.match(/url\((.*)\)/)[1];
          imageUrls.push(backgroundImageUrl);
        }
        setImages(imageUrls);
      });
  }, [images.length]);

  return (
    <div id="sponsors">
      <h2>Sponsored by:</h2>
      <div id="sponsorsLogos">
        <Marquee
          gradient={false}
          speed={30}
        >
          {images.map((image, i) => (
            <img key={i} src={image} alt={`img-${i}`} width={200} style={{margin: '0 100px 0'}}/>
          ))}
        </Marquee>
      </div>
    </div>
  );
}

export default Sponsors;
