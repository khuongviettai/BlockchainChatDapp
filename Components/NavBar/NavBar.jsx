import React, { useEffect, useState, useContext } from "react";
import Style from "./NavBar.module.css";
import Image from "next/image";
import { ChatAppContext } from "@/Context/ChatAppContext";
import { Model, Error } from "../index";
import images from "../../assets/index";
import Link from "next/link";

const NavBar = () => {
  const menuItem = [
    {
      menu: "All user",
      link: "alluser",
    },
    {
      menu: "Chat",
      link: "/",
    },
    {
      menu: "Contact",
      link: "/",
    },
    {
      menu: "Setting",
      link: "/",
    },
    {
      menu: "FAQS",
      link: "/",
    },
    {
      menu: "TERMS OF USER",
      link: "/",
    },
  ];
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [opeModel, setOpenModel] = useState(false);

  const { account, userName, connectWallet } = useContext(ChatAppContext);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_menu}>
            {menuItem.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={1 + 1}
                className={`${Style.NavBar_box_right_menu_item} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_item_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
