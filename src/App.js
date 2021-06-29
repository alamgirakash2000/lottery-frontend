import React, { useState, useEffect } from 'react';
import './App.css';
import web3 from './web3'
import lottery from './lottery'


function App() {
  const [manager, setManager] = useState('');

  useEffect(() => {
    const fetchData = async () => {
       setManager(await lottery.methods.manager().call());
    }
    fetchData();
    
  },[])

  return (
    <div className="app">
      <div className="container">
         <h1 className="text-center">Lottery Contract</h1>
         <h5>This contract is managed by: {manager}</h5>
      </div>
    </div>
  );
}

export default App;
