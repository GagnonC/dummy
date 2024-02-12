import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('');
  const [hitCount, setHitCount] = useState(0);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:3030/pinging');
      if (response.status === 200) {
        setApiStatus('API is online');
        updateHitCount();
      } else {
        setApiStatus('API is offline');
      }
    } catch (error) {
      setApiStatus('API is offline');
    }
  };

  const updateHitCount = async () => {
    try {
      const hitCountResponse = await fetch('http://localhost:3030/hitCount');
      const hitCountData = await hitCountResponse.json();
      setHitCount(hitCountData.hitCount);
    } catch (error) {
      setHitCount(0);
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{apiStatus}</p>
          <p>Hit Count in Current Session: {hitCount}</p>
          <button onClick={checkApiStatus}>Check API Status</button>
          <p>Edit <code>src/App.tsx</code> and save to reload.</p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;