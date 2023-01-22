import './App.css';
import Events from './Events';
import Lunch from './Lunch';
import Sponsors from './Sponsors';
import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

export const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [ cursorVisible, setCursorVisible ] = useState(true);
  const [ isLoadingEvents, setIsLoadingEvents ] = useState(true);
  const [ isLoadingLunch, setIsLoadingLunch ] = useState(true);
  const [ isLoadingSponsors, setIsLoadingSponsors ] = useState(true);

  // Check that everything is loaded
  const allLoaded = !(isLoadingEvents || isLoadingLunch || isLoadingSponsors);

  // Automatically refresh the page every 1 hour
  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    }, 3600000);
  }, []);

  // Hide mouse cursor when is has been stationary for 1 second
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = () => {
      setCursorVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setCursorVisible(false), 1000);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div id="app" className={`${cursorVisible ? 'cursor-visible' : 'cursor-hidden'} ${!allLoaded ? 'loading' : ''}`}>
      {!allLoaded && <Spinner /> }
      <Events isLoading={setIsLoadingEvents}/>
      <Lunch isLoading={setIsLoadingLunch}/>
      <Sponsors isLoading={setIsLoadingSponsors}/>
    </div>
  );
}

export default App;
