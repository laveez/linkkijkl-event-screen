import React, { useEffect, useState } from 'react';
import { API_URL } from './App';
import Spinner from './Spinner';

const Lunch = () => {
  const [ lunchData, setLunchData ] = useState();
  const [ loading, setLoading ] = useState(true);

  /**
   * Fetch lunch data and set loading attribute
   */
  useEffect(() => {
    setLoading(true);
    fetch(API_URL + '/lunch')
      .then(response => response.json())
      .then(data => {
        setLunchData(data.LunchMenu);
        setLoading(false);
      });
  }, []);

  return (
    <div id="lunch">
      <h2>Piato lounas</h2>
      {loading && <Spinner size={40}/>}
      {!lunchData && !loading && <p>Ei lounasta tänään</p>}
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
