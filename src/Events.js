import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';

const Events = () => {

  const [ eventData, setEventData ] = useState();

  useEffect(() => {
    fetch('https://clients6.google.com/calendar/v3/calendars/c_g2eqt2a7u1fc1pahe2o0ecm7as@group.calendar.google.com/events?calendarId=c_g2eqt2a7u1fc1pahe2o0ecm7as%40group.calendar.google.com&singleEvents=true&timeZone=Europe%2FHelsinki&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2022-12-26T00%3A00%3A00%2B02%3A00&timeMax=2023-02-06T00%3A00%3A00%2B02%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs')
      .then(response => response.json())
      .then(data => setEventData(data));
  }, []);
  // <li key={index}>{`[${moment(item.start.dateTime).format('DD.MM.YYYY')}] // ${item.summary}`}</li>
  // <li>{item.summary} {item.location} {moment(item.start.dateTime).format('DD.MM.YYYY')} - {moment(item.end.dateTime).format('DD.MM.YYYY')}</li>)}
  return (
    <div id="events">
      <h2>Tapahtumat:</h2>
      <ul>
        {eventData?.items.map(item => <li>{`[${moment(item.start.dateTime).format('DD.MM.YYYY')}] // ${item.summary}`}</li>)}
      </ul>
    </div>
  );
}

export default Events;
