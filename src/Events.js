import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import Spinner from './Spinner';
import { API_URL } from './App';

const Events = () => {

  const [ eventData, setEventData ] = useState();

  useEffect(() => {
    fetch(API_URL + '/events')
        .then(response => response.json())
        .then(data => setEventData(data?.items));
  }, []);

  return (
    <div id="events">
      <h2>Tapahtumat</h2>
      {!eventData && <Spinner size={40}/>}
      <ul>
        {eventData?.map(item =>
          <li>
            {`[${moment(item.start.dateTime || item.start.date || "").format('DD.MM.YYYY')}] // ${item.summary}`}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Events;
