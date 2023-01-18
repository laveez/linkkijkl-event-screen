import './App.css';
import Events from './Events';
import Lunch from './Lunch';
import Sponsors from './Sponsors';

export const API_URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <div id="app">
      <Events />
      <Lunch />
      <Sponsors />
    </div>
  );
}

export default App;
