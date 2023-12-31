import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ChatAppContext } from '@/Context/ChatAppContext';
import images from "../../assets";

import Style from "./NavBar.module.css";
import {Form, Error} from "@/Components";

const NavBar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "alluser",
    },
    {
      menu: "CHAT",
      link: "/",
    },
  ];

  //USESTATE
  const [active, setActive] = useState(2);
  const [open, setOpen] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const { account, username, connectWallet, createAccount, error } = useContext(ChatAppContext);
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div 
                onClick={() => setActive(i + 1)} 
                key={i + 1} 
                className={`${Style.NavBar_box_right_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link className={Style.NavBar_box_right_menu_items_link}
                href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
            {menuItems.map((el, i) => (
              <div 
                onClick={() => setActive(i + 1)} 
                key={i + 1} 
                className={`${Style.mobile_menu_items} ${
                  active == i + 1 ? Style.active_btn : ""
                }`}
              >
                <Link className={Style.mobile_menu_items_link}
                href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
            <p className={Style.mobile_menu_btn}>
              <Image 
                src={images.close} 
                alt="close" width={50} height={50}
                onClick={() => setOpen(false)}
              />
            </p>
          </div>
          )}

          {/* CONNECT WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account == "" ? (
              <button onClick={() => connectWallet(true)}>
                {""}
                <span>Connetti il Wallet</span>
              </button>
            ) : (
              <button onClick={() => username ? '' : setOpenModel(true)}>
                {""}
                <Image src={username ? images.accountName : images.create2}
                  alt="Account image" width={20} height={20}
                />
                {''}
                <small>{username || "crea un account"}</small>
              </button>
            )}
          </div>
          <div className={Style.NavBar_box_right_open} onClick={() => setOpen(true)}>
            <Image src={images.open} alt="open" width={30} height={30}/>
          </div>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {openModel && (
          <div className={Style.modelBox}>
            <Form
                openBox={setOpenModel}
                title="BENVENUTO NELLA"
                head="CHAT"
                info="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius fuga tenetur harum necessitatibus suscipit, cupiditate omnis vel consequuntur voluptas, iste, dolorem beatae corrupti natus. Cupiditate in libero reiciendis velit laboriosam."
                smaLLInfo="Per favore seleziona il tuo nome"
                image={images.hero}
                functionName={createAccount}
                address={account}
            />
          </div>
      )}
      {error == "" ? "" : <Error error = {error} />}
    </div>
  );
}

export default NavBar;