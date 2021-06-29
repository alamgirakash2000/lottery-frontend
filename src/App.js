import React, { useState, useEffect } from 'react';
import './App.css';
import web3 from './web3'
import lottery from './lottery'


function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('0');

  const [value, setValue] = useState('')
  const [message, setMessage] = useState("")
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setManager(await lottery.methods.manager().call());
      setPlayers(await lottery.methods.getPlayers().call());
      setBalance(await web3.eth.getBalance(lottery.options.address));
    }
    fetchData();
  }, [message])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage("Transaction on processing, please wait...");
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether")
      });
      setMessage("Welcome! You've entered in this competition...");
    } catch (err) {
      setMessage("");
      setError(err.message);
    }
  }

  const handleClick = async () => {
    const accounts = await web3.eth.getAccounts();


    setMessage("Picking up winner in progress...");
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0],
      })
      setValue("0");
      setMessage("Welcome! You've entered in this competition...");
    } catch (err) {
      setMessage("");
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <div className="container">
         <h1 className="text-center">Lottery Contract</h1>
         <p>This contract is managed by: {manager}. There are currently { players?.length} people entered, competing to win {web3.utils.fromWei(balance,'ether')} ether! </p>
         <hr/>
        <form onSubmit={handleSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter:</label>
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success">Enter</button>
        </form>
        <hr />
        <h1 className="text-info">{message}</h1>
        <h1 className="text-danger">{error}</h1>
        <hr />
        
        <h4>Ready to pick a winner?</h4>
        <button className="btn btn-warning" onClick={handleClick}>Pick a winner</button>
      </div>
    </div>
  );
}

export default App;
