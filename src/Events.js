import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { API_URL } from './App';

/**
 * A component to display events
 * @param isLoading a method to update the loading state of events to parent component
 * @returns {JSX.Element} events in a list
 */
const Events = ({ isLoading }) => {
  const [ eventData, setEventData ] = useState();
  const [ glitch, setGlitch ] = useState(false);

  /**
   * Fetch event data
   */
  useEffect(() => {
    isLoading(true);
    fetch(API_URL + '/events')
      .then(response => response.json())
      .then(data => {
        setEventData(data?.items);
        isLoading(false);
      });
  }, [ isLoading ]);

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
    <div id="events" className={glitch ? 'glitch' : ''}>
      <h2>Tapahtumat</h2>
      <ul>
        {!eventData && <>Ei tapahtumia</>}
        {eventData?.map(item =>
          <li>
            {`[${moment(item.start.dateTime || item.start.date || "").format('DD/MM/YYYY')}` +
              `${item.start.dateTime ? '·' + moment(item.start.dateTime).format('HH:mm') : ''}]` +
              ` // ${item.summary}`}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Events;
