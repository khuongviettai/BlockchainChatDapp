import React, { useContext, useState } from "react";
import Style from "./Model.module.css";
import Image from "next/image";
import images from "../../assets";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Loader } from "../../Components/index";

const Model = ({
  openModel,
  title,
  head,
  info,
  smallInfo,
  images,
  functionName,
}) => {
  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");
  const { loading } = useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
      </div>
    </div>
  );
};

export default Model;
