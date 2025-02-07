import React from 'react';
import Marquee from 'react-fast-marquee';

/**
 * A component to display sponsor images
 * @param data an array of image urls
 * @param className a class name for styling
 * @returns {JSX.Element} sponsor images in a marquee
 */
const Sponsors = ({ data, className }) => (
  <div id="sponsors" className={className}>
    <h2>Sponsored by</h2>
    <div id="sponsorsLogos">
      {(data == null || data?.length === 0 || !Array.isArray(data)) && <>Ei sponsoreita</>}
      {data?.length > 0 && <Marquee
        gradientColor={[ 0, 0, 0 ]}
        speed={data?.length + 30}
      >
        {Array.isArray(data) && data?.map((image, i) =>
          <img
            key={image}
            src={image}
            alt={`img-${i}`}
          />)}
      </Marquee>}
    </div>
  </div>
);

export default Sponsors;
