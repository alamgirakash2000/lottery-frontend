import Web3 from "web3";

let web3 = false;
if (window.web3?.currentProvider) {
  web3 = new Web3(window.web3.currentProvider);
}

export default web3;
