import React, { useEffect, useState } from 'react';
import { HashLoader, PacmanLoader } from 'react-spinners';

/**
 * Enum for loader types.
 * @readonly
 * @enum {string}
 */
export const LOADER_TYPES = {
  HASH: 'HASH',
  PACMAN: 'PACMAN',
};

/**
 * Calculates the intermediate color between the current color and the target color based on the progress.
 * @param {string} currentColor - The current color in hex format.
 * @param {string} targetColor - The target color in hex format.
 * @param {number} progress - The progress of the transition (0-1).
 * @returns {string} The intermediate color in rgb format.
 */
const calculateIntermediateColor = (currentColor, targetColor, progress) => {
  // Parse colors
  const currentColorRGB = parseColor(currentColor);
  const targetColorRGB = parseColor(targetColor);

  // Calculate intermediate color
  const intermediateColorRGB = {
    r: currentColorRGB.r + (targetColorRGB.r - currentColorRGB.r) * progress,
    g: currentColorRGB.g + (targetColorRGB.g - currentColorRGB.g) * progress,
    b: currentColorRGB.b + (targetColorRGB.b - currentColorRGB.b) * progress,
  };

  // Convert intermediate color to string
  return `rgb(${Math.round(intermediateColorRGB.r)}, ${Math.round(intermediateColorRGB.g)}, ${Math.round(intermediateColorRGB.b)})`;
};

/**
 * Parses a color from hex format to an object with r, g, and b properties.
 * @param {string} color - The color in hex format.
 * @returns {Object} The color in rgb format as an object with r, g, and b properties.
 */
const parseColor = (color) => {
  const match = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return {
    r: parseInt(match[1], 16),
    g: parseInt(match[2], 16),
    b: parseInt(match[3], 16),
  };
};

/**
 * A spinner component for loading screen and transitions
 * Positioned absolutely to the center of the screen
 * @param color the color of the spinner
 * @param type what loader we are using, either 'HASH' or 'PACMAN'
 * @param sizeFactor a factor to determine the size of the spinner
 * @param props other props to pass to the loader
 * @returns {JSX.Element} element containing PacmanLoader
 */
const Spinner = ({
  color = "#387DFF",
  type = LOADER_TYPES.PACMAN,
  sizeFactor = 1,
  ...props
}) => {
  const [currentColor, setCurrentColor] = useState(color);

  /**
   * Transition between colors when the color prop changes
   * @param color the target color
   */
  useEffect(() => {
    let start;
    const duration = 1000; // transition duration in milliseconds

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const newColor = calculateIntermediateColor(currentColor, color, progress / duration);
      setCurrentColor(newColor);
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setCurrentColor(color);
      }
    };

    requestAnimationFrame(step);
  }, [color]);

  // Set options for the loader
  const options = {
    speedMultiplier: 2,
    size: window.innerHeight * 0.1 * sizeFactor,
    color: currentColor,
    cssOverride: {
      position: "absolute",
      zIndex: 2,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      margin: "auto",
    }
  }

  return type === LOADER_TYPES.PACMAN ?
    <PacmanLoader {...options} {...props}/> :
    <HashLoader {...options} {...props}/>;
};

export default Spinner;
