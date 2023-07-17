import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { ChatAppAddress, ChatAppABI } from "@/Context/constant";

export const ChechIfWalletConnect = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMark");

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("Install MetaMark");
  }
};

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MateMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const converTime = (time) => {
  const newTime = new Date(time.toNumer());

  const realTime =
    newTime.getHours() +
    "/" +
    newTime.getMinutes() +
    newTime.getSeconds() +
    " Date:" +
    newTime.getDate() +
    "/" +
    newTime.getMonth() +
    "/" +
    newTime.getFullYear();
  return realTime;
};
