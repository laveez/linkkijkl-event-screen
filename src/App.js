import './App.css';
import Events from './Events';
import Lunch from './Lunch';
import Sponsors from './Sponsors';
import { useEffect } from 'react';

export const API_URL = process.env.REACT_APP_API_URL;

function App() {

  // Automatically refresh the page every 1 hour
  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    }, 3600000);
  }, []);

  return (
    <div id="app">
      <Events />
      <Lunch />
      <Sponsors />
    </div>
  );
}

export default App;
