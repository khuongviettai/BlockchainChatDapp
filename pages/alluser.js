import React, { useState, useEffect, useContext } from "react";
import { UserCard } from "../Components/index";
import Style from "../styles/alluser.module.css";
import { ChatAppContext } from "@/Context/ChatAppContext";

const alluser = () => {
  const { userLists, addFriends } = useContext(ChatAppContext);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find Your Friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists &&
          userLists.map((el, i) => {
            return (
              <div key={i + 1} className={Style.UserCard_box_info}>
                <h3>{el.name}</h3>
                <p>{el.accountAddress.slice(0, 25)}...</p>
                <button onClick={() => addFriends({ name: el.name })}>
                  addFriends
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default alluser;
