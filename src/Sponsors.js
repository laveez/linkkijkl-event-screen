import React, { useState, useEffect } from 'react';

const Sponsors = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('https://linkkijkl.fi/')
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
  }, []);

  return (
    <div id="sponsors">
      <h2>Sponsored by:</h2>
      <div id="sponsorsLogos">
        {images.map((image,i) => (
          <img key={i} src={image} alt={`img-${i}`} width="200"/>
        ))}
      </div>
    </div>
  );
}

export default Sponsors;
