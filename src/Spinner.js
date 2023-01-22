import React from 'react';
import { PacmanLoader } from 'react-spinners';

/**
 * A pacman spinner component for loading screen
 * Positioned absolutely to the center of the screen
 * @param color the color of the spinner
 * @returns {JSX.Element} element containing PacmanLoader
 */
const Spinner = ({ color = "#ffbf00" }) => {
  return <PacmanLoader
    size={window.innerHeight * 0.1}
    color={color}
    cssOverride={{
      position: "absolute",
      zIndex: 2,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
  }}
  />
};

export default Spinner;
