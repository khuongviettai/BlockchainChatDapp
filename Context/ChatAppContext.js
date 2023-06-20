import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  CheckIfWalletConnected,
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
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");

  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  const fetchData = async () => {
    try {
      const contract = await connectingWithContract();
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      const userName = await contract.getUsername(connectAccount);
      setUserName(userName);
      const friendLists = await contract.getMyFriendList();
      setFriendLists(friendLists);
      const userList = await contract.getAllAppUsers();
      setUserList(userList);
    } catch (error) {
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
      console.log(error);
    }
  };

  const createAccount = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress)
        return setError("Name and AccountAddress cannot be empty");
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addFriends = async () => {
    try {
      if (!name || !accountAddress) return setError("Please provide data");

      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async ({ msg, address }) => {
    try {
      if (!msg || !address) return setError("Please type your Message");

      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const readUser = async (userAddress) => {
    const contract = await connectingWithContract();
    const userName = await contract.getUsername(userAddress);
    setCurrentUserName(userName);
    setCurrentUserAddress(userAddress);
  };

  return (
    <ChatAppContext.Provider
      value={[
        readMessage,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        connectWallet,
        CheckIfWalletConnected,
        account,
        userName,
        friendLists,
        friendMsg,
        userList,
        loading,
        error,
        currentUserName,
        currentUserAddress,
      ]}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
