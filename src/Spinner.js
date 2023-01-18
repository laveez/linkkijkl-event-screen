import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Spinner = ({ size = 20, color = "#ffbf00" }) => {
  return <PacmanLoader
    heightUnit={"vh"}
    size={size}
    color={color}
  />
};

export default Spinner;
