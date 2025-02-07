import React from 'react';

/**
 * A component to display lunch
 * @param name title for the lunch
 * @param data an array of lunch items
 * @param className a class name for styling
 * @returns {JSX.Element} lunch items in a list
 */
const Lunch = ({ name, data, className }) => (
  <div id="lunch" className={className}>
    <h2>{name} lounas</h2>
    {(data == null || data?.length === 0 || !Array.isArray(data)) && <p>Ei lounasta tänään</p>}
    {Array.isArray(data) && data?.map(setMenu => (
      <div key={setMenu.sortOrder} style={{ marginBottom: '2vh' }}>
        <ul>
          <li>{setMenu.name} {setMenu.name && ' // '}{setMenu.price}</li>
          {Array.isArray(setMenu.meals) && setMenu.meals?.map(meal =>
            <li key={meal.recipeId}>
              {meal.name}
            </li>)}
        </ul>
      </div>
    ))}
  </div>
);

export default Lunch;
