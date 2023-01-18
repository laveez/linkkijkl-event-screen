import React, { useEffect, useState } from 'react';
import { API_URL } from './App';

const Lunch = () => {
  const [ lunchData, setLunchData ] = useState();

  useEffect(() => {
    fetch(API_URL + '/lunch')
      .then(response => response.json())
      .then(data => setLunchData(data.LunchMenu));
  }, []);

  return (
    <div id="lunch">
      <h2>Piato lounas:</h2>
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
