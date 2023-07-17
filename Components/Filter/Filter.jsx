import React, { useContext, useState } from "react";
import Style from "./Filter.module.css";
import Image from "next/image";
import images from "../../assets/index";
import { ChatAppContext } from "@/Context/ChatAppContext";
import Model from "../index";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContext);
  const [addFriend, setAddFriend] = useState(false);
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={20} height={20} />
            <input type="text" placeholder="search ..." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAN CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="Welcome to"
            head="Chat Box"
            infor="hello"
            smallInfo="Select your friend name & address"
            image={images.hero}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
