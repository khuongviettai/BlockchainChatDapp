import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  ChechIfWalletConnected,
  connectWallet,
  connectingWithContract,
} from "@/Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      // const userName = await contract.getUsername(connectAccount);
      // setUserName(userName);
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      const userList = await contract.getAllAppUser();
      setUserLists(userList);
    } catch (error) {
      setError("Please Install and Connect Your Wallet!!!");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently You have no Message");
      console.log(error);
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      // if (!name || !accountAddress)
      //   return setError("Name and AccountAddress cannot be empty");
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating an account. Please reload the browser.");
      console.log(error);
    }
  };

  const addFriends = async (name, accountAddress) => {
    try {
      if (!name || !accountAddress) return setError("Please provide data");

      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(name, accountAddress);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong while adding a friend. Please try again!");
      console.log(error);
    }
  };

  const sendMessage = async ({ msg, address, name }) => {
    try {
      if (!msg || !address) return setError("Please type your Message");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(msg, address);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const readUser = async (userAddress, name) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        ChechIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        userLists,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
