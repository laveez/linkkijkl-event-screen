import React, { useEffect, useState } from 'react';
import { API_URL } from './App';

/**
 * A component to display lunch
 * @param isLoading a method to update the loading state of lunch to parent component
 * @returns {JSX.Element} lunch items in a list
 */
const Lunch = ({ isLoading }) => {
  const [ lunchData, setLunchData ] = useState();

  /**
   * Fetch lunch data and set loading attribute
   */
  useEffect(() => {
    isLoading(true);
    fetch(API_URL + '/lunch')
      .then(response => response.json())
      .then(data => {
        setLunchData(data.LunchMenu);
        isLoading(false);
      });
  }, [ isLoading ]);

  return (
    <div id="lunch">
      <h2>Piato lounas</h2>
      {!lunchData && <p>Ei lounasta tänään</p>}
      {lunchData?.SetMenus.map((setMenu, i) => (
        <div key={i} style={{marginBottom: '4vh'}}>
          <ul>
            <li>{setMenu.Name}{setMenu.Name && ' // '}{setMenu.Price}</li>
            {setMenu.Meals.map((meal, j) => (
              <li key={j}>{meal.Name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Lunch;
