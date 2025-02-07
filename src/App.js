import './App.css';
import Events from './Events';
import Lunch from './Lunch';
import Sponsors from './Sponsors';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Spinner, { LOADER_TYPES } from './Spinner';
import { getEventData, getLunchData, getSponsors, keepAlive, useFetchData } from './dataQueries';

export const API_URL = process.env.REACT_APP_API_URL;

/**
 * A component to display data
 * @param name title for the data
 * @param data an array of data
 * @param className a class name for styling
 * @param Component a component used to display the data
 * @returns {JSX.Element} the data displayed with the given component
 */
const DataComponent = ({ name, data, className, Component }) => 
  <Component name={name} data={data} className={className} />;

function App() {
  // Initial state is randomly true or false
  const [ showAlternate, setShowAlternate ] = useState(Math.random() < 0.5);
  const [ showAlternateColor, setShowAlternateColor ] = useState(false);
  const [ isTransitioning, setIsTransitioning ] = useState(false);

  const fetchLinkkiEvents = useCallback(() => getEventData('linkki'), []);
  const fetchAlgoEvents = useCallback(() => getEventData('algo'), []);
  const fetchLinkkiSponsors = useCallback(() => getSponsors('linkki'), []);
  const fetchAlgoSponsors = useCallback(() => getSponsors('algo'), []);
  const fetchMaijaLunch = useCallback(() => getLunchData('maija'), []);
  const fetchPiatoLunch = useCallback(() => getLunchData('piato'), []);

  const fetchFunctions = useMemo(() => ({
    linkkiEvents: fetchLinkkiEvents,
    algoEvents: fetchAlgoEvents,
    linkkiSponsors: fetchLinkkiSponsors,
    algoSponsors: fetchAlgoSponsors,
    maijaLunch: fetchMaijaLunch,
    piatoLunch: fetchPiatoLunch,
  }), [ fetchLinkkiEvents, fetchAlgoEvents, fetchLinkkiSponsors, fetchAlgoSponsors, fetchMaijaLunch, fetchPiatoLunch ]);

  const [ data, isLoading ] = useFetchData(fetchFunctions);

  // Automatically reload the page every 1 hour
  useEffect(() => {
    setInterval(() => {
      window.location.reload();
    }, 3600000);
  }, []);

  // Keep the server alive by pinging it every 10 minutes
  useEffect(() => {
    const intervalId = setInterval(keepAlive, 600000); // 600000 ms = 10 minutes
    return () => clearInterval(intervalId); // cleanup on component unmount
  }, []);

  /**
   * Transition between Linkki and Algo data every 2 minutes
   * The transition is done by changing the class name of the app container
   */
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setShowAlternateColor(prevShowAlternateC => !prevShowAlternateC);
      setTimeout(() => {
        setShowAlternate(prevShowAlternate => !prevShowAlternate);
        setIsTransitioning(false);
      }, 1000); // Transition duration
    }, 120000); // Time between transitions
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="app" className={showAlternate ? 'algo' : 'linkki'}>
      <div id="app-container" className={showAlternate ? 'algo' : 'linkki'}>
        <div className={`fade-transition-overlay ${isLoading ? 'fade-transition-overlay-active' : ''}`}>
          <Spinner/>
        </div>
        <div className={`fade-transition-overlay ${isTransitioning ? 'fade-transition-overlay-active' : ''}`}>
          <Spinner
            color={showAlternateColor ? '#FEBDBF' : '#387DFF'}
            type={LOADER_TYPES.HASH}
            sizeFactor={3}
            className={`spinner-fade ${isTransitioning ? 'spinner-fade-active' : ''}`}
          />
        </div>
        {showAlternate ? <>
          <DataComponent name={'Algon'} data={data.algoEvents} className='algo' Component={Events}/>
          <DataComponent name={'Maija'} data={data.maijaLunch} className='algo' Component={Lunch}/>
          <DataComponent data={data.algoSponsors} className='algo' Component={Sponsors}/>
        </> : <>
          <DataComponent name={'Linkin'} data={data.linkkiEvents} className='linkki' Component={Events}/>
          <DataComponent name={'Piato'} data={data.piatoLunch} className='linkki' Component={Lunch}/>
          <DataComponent data={data.linkkiSponsors} className='linkki' Component={Sponsors}/>
        </>}
      </div>
    </div>
  );
}

export default App;
