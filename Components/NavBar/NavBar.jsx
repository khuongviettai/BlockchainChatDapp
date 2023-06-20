import React, { useState, useContext } from "react";
import Style from "./NavBar.module.css";
import Image from "next/image";
import { ChatAppContext } from "@/Context/ChatAppContext";
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

  const { account, userName, connectWallet } = useContext(ChatAppContext);

  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        {/* desktop */}
        <div className={Style.NavBar_box_right}>
          <div className={Style.NavBar_box_right_menu}>
            {menuItem.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i}
                className={`${Style.NavBar_box_right_menu_item} ${
                  active === i + 1 ? Style.active_btn : ""
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

          {/* mobile */}
          {!open && (
            <div className={Style.mobile_menu}>
              {menuItem.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i}
                  className={`${Style.mobile_menu_item} ${
                    active === i + 1 ? Style.active_btn : ""
                  }`}
                >
                  <Link className={Style.mobile_menu_item_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}
          {/* connect wallet */}
          <div className={Style.NavBar_box_right_connect}>
            {account === "" ? (
              <button onClick={() => connectWallet()}>
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="account"
                  width={20}
                  height={20}
                />
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
