import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';

/**
 * A component to display events
 * @param name title for the events
 * @param data an array of events
 * @param className a class name for styling
 * @returns {JSX.Element} events in a list
 */
const Events = ({ name, data, className }) => {
  const [ glitch, setGlitch ] = useState(false);

  /**
   * Glitch effect
   * Fires randomly every 1 to 3 minutes for 0 to 0.4 seconds
   */
  useEffect(() => {
    // Generate a random interval between 1 and 3 minutes
    const interval = Math.random() * (3 - 1) + 1;
    // Convert minutes to milliseconds
    const intervalTime = interval * 60 * 1000;

    // Set the interval to change the attribute
    const intervalId = setInterval(() => {
      // Generate a random duration between 0 and 0.4 seconds
      const duration = Math.random();
      // Convert seconds to milliseconds
      const durationTime = duration * 400;
      setGlitch(true);
      // Set the timeout to change the attribute
      setTimeout(() => {
        setGlitch(false);
      }, durationTime);
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="events" className={glitch ? `glitch ${className}` : className}>
      <h2>{name} tapahtumat</h2>
      <ul>
        {(!data || data?.length === 0) && <>Ei tapahtumia</>}
        {data?.map((item, i) =>
          <li key={`event-${i}`}>
            {`[${moment(item.start.dateTime || item.start.date || "").format('DD/MM/YYYY')}` +
              `${item.start.dateTime ? '·' + moment(item.start.dateTime).format('HH:mm') : ''}]` +
              ` // ${item.summary}`}
          </li>)}
      </ul>
    </div>
  );
}

export default Events;
