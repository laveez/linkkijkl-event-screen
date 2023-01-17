import React, { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const Sponsors = () => {
  const [images, setImages] = useState([
    "https://linkkijkl.fi/wp-content/uploads/2020/12/ceili_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/expa_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/insta_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/jamix_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/pinja_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/reaktor_100-1.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/secapp_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/semma_100-1.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/teerenpeli_100-1.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/tek_200.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/tnnet_100-1.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/vala-group_100-1.png",
    "https://linkkijkl.fi/wp-content/uploads/2020/12/visma_100-1.png",
    "https://linkkijkl.fi/wp-content/uploads/2021/08/accenture_logo-e1629327437106.png",
    "https://linkkijkl.fi/wp-content/uploads/2021/08/WEBSO1.1003d219-e1629327467997.png",
    "https://linkkijkl.fi/wp-content/uploads/2021/08/Valu-e1629327507238.png",
    "https://linkkijkl.fi/wp-content/uploads/2021/08/tivia-e1629327539177.png",
    "https://linkkijkl.fi/wp-content/uploads/2021/08/aitio_logo-e1629327561975.png",
    "https://linkkijkl.fi/wp-content/uploads/2022/09/boulder-e1663622776799.png",
    "https://linkkijkl.fi/wp-content/uploads/2022/09/antishop-e1663623168803.png",
    "https://linkkijkl.fi/wp-content/uploads/2022/11/bf008736-8c1f-45f3-8acf-585e765ab597-e1668103069292.jpg"
  ]);

  useEffect(() => {
    fetch('https://linkkijkl.fi/')
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const imageElements = doc.querySelectorAll('.elementor-carousel-image');
        const imageUrls = [];
        if (imageElements.length > 0) {
          for (let element of imageElements) {
            const style = element.getAttribute('style');
            const backgroundImageUrl = style.match(/url\((.*)\)/)[1];
            imageUrls.push(backgroundImageUrl);
          }
        }
        setImages(imageUrls);
        console.log(imageUrls)
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
