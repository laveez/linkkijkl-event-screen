import React from 'react';
import Marquee from 'react-fast-marquee';

/**
 * Sponsor image component
 * @param src a source url to load the image from
 * @param alt an alternative text to display on the image
 * @returns {JSX.Element} img with given src and alt
 */
const SponsorImage = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

/**
 * A component to display sponsor images
 * @param data an array of image urls
 * @param className a class name for styling
 * @returns {JSX.Element} sponsor images in a marquee
 */
const Sponsors = ({ data, className }) => {

  return (
    <div id="sponsors" className={className}>
      <h2>Sponsored by</h2>
      <div id="sponsorsLogos">
        {(!data || data?.length === 0) && <>Ei sponsoreita</>}
        {data?.length > 0 && <Marquee
          gradientColor={[0, 0, 0]}
          speed={data?.length * 5}
        >
          {data.map((image, i) => (
            <SponsorImage
              key={i}
              src={image}
              alt={`img-${i}`}
            />
          ))}
        </Marquee>}
      </div>
    </div>
  );
}

export default Sponsors;
