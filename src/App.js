import React, { useState, useEffect } from "react";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";
import PickWinnerModal from "./components/PickWinnerModal/PickWinnerModal";
import MessageModal from "./components/MessageModal/MessageModal";

function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("0");

  const [value, setValue] = useState("");
  const [message, setMessage] = useState({
    title: "",
    msg: "",
    status: "",
  });
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setManager(await lottery.methods.manager().call());
      setPlayers(await lottery.methods.getPlayers().call());
      setBalance(await web3.eth.getBalance(lottery.options.address));
    };
    fetchData();
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    setMessage({
      title: "Entering to the Lottery",
      msg: "Transaction on processing, please wait...",
      status: "waiting",
    });
    setOpen(true);
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      setMessage({
        title: "Entering to the Lottery",
        msg: "Welcome! You've entered in this competition...",
        status: "success",
      });
      setValue("0");
    } catch (err) {
      setMessage({
        title: "Entering to the Lottery",
        msg: "Enter the amount correctly. Must be greater than 0.011.",
        status: "error",
      });
    }
  };

  return (
    <div className='app'>
      <div className='container py-5'>
        <h1 className='text-center'> Welcome to Lottery Contract</h1>
        <p>
          This is an smart contract running on Ethereum Rinkeby network. Here
          anyone can enter as a player. One has to pay minimum 0.011 Rinkeby
          test Ether to enter this competition. When sufficient number of player
          will enter, the manager will pick a winner by random generator
          algorithm. And the winner will automatically get all the available
          Ether in this contract.
        </p>
        <h2>INFO : </h2>
        <hr />
        <p>
          This contract is managed by: <b className='text-primary'>{manager}</b>{" "}
        </p>
        <p>
          Number of entered players:{" "}
          <b className='text-primary'>{players?.length}</b>
        </p>
        <p>
          Amount of Rinkeby Ether:{" "}
          <b className='text-primary'>{web3.utils.fromWei(balance, "ether")}</b>
        </p>
        <br />

        <h2>Want to try your luck?</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div class='form-group'>
            <label labelFor='value'>Enter the amount of Ether:</label>
            <input
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className='form-control w-50'
              id='value'
              aria-describedby='valueHelp'
              placeholder='Ex. 0.012'
            />
            <small id='valueHelp' className='form-text text-muted'>
              Minimum amount should be 0.011
            </small>
          </div>
          <button type='submit' className='btn-lg my-4 btn-success'>
            Enter
          </button>
        </form>
        <MessageModal message={message} open={open} setOpen={setOpen} />
        <PickWinnerModal
          message={message}
          setMessage={setMessage}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
}

export default App;
