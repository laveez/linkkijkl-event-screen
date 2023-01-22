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
  const [ allLoaded, setAllLoaded ] = useState(false);

  // Check that everything is loaded
  useEffect(() => {
    setAllLoaded(!(isLoadingEvents || isLoadingLunch || isLoadingSponsors));
  }, [ isLoadingEvents, isLoadingLunch, isLoadingSponsors ]);

  // Reload page after waiting 5 seconds if not allLoaded
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!allLoaded) {
        window.location.reload();
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [ allLoaded ]);

  // Automatically reload the page every 1 hour
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
