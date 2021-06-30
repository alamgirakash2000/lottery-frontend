import React from "react";
import web3 from "../../web3";
import lottery from "../../lottery";

const PickWinnerModal = ({ message, setMessage, setOpen }) => {
  const handleClick = async () => {
    const accounts = await web3.eth.getAccounts();
    setOpen(true);
    setMessage({
      title: "Picking up the winner...",
      msg: "Picking up in progress...",
      status: "waiting",
    });
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });
      setMessage({
        title: "Picking up the winner...",
        msg: "Congratulation! You have picked the winner.",
        status: "success",
      });
    } catch (err) {
      setMessage({
        title: "Picking up the winner...",
        msg: "Sorry! You are not the manager.",
        status: "error",
      });
    }
  };
  return (
    <div className='pickWinner'>
      <h2>Ready to pick a winner?</h2>
      <hr />
      <p className='text-warning'>
        {" "}
        <b className='text-info'>Note : </b> Only the manager can pick the
        winner. So if you are not the manager, don't try to pick because it
        won't work.
      </p>
      <div className='text-center'>
        <button className='btn-lg btn-danger' onClick={handleClick}>
          Pick a winner
        </button>
      </div>
    </div>
  );
};

export default PickWinnerModal;
