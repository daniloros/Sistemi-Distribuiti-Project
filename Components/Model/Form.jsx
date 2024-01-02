import React, { useState, useContext } from 'react';
import Image from 'next/image';

import Style from './Form.module.css';
import images from '../../assets';
import { ChatAppContext } from '@/Context/ChatAppContext';
import {Error, Loader} from '../../Components/index';

const Form = ({ openBox, title, address, head, info, smaLLinfo, image, functionName }) => {

  const [name, setName] = useState("");
  const [accountAddress, setAccountAddress] = useState("");

  const { loading, error } = useContext(ChatAppContext);
  return (
    <div className={Style.Model}>
      <div className={Style.Model_box}>
        <div className={Style.Model_box_left}>
          <Image src={image} alt="buddy" width={700} height={700} />
        </div>
        <div className={Style.Model_box_right}>
          <h1>{title} <span>{head}</span></h1>
          <p>{info}</p>
          <small>{smaLLinfo}</small>

          {
            loading == true ? (
              <Loader />
            ) : (
              <div className={Style.Model_box_right_name}>
                <div className={Style.Model_box_right_name_info}>
                  <Image src={images.username} alt="user" width={30} height={30}></Image>
                  <input type="text"
                    placeholder="Account"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={Style.Model_box_right_name_info}>
                  <Image src={images.account} alt="user" width={30} height={30}></Image>
                  <input type="text"
                    placeholder={address || "Indirizzo Wallet"}
                    onChange={(e) => {setAccountAddress(e.target.value)}}
                  />
                </div>

                <div className={Style.Model_box_right_name_btn}>
                  <button onClick={() => openBox(false)}>
                    <Image src={images.close} alt='send' width={30} height={30}></Image>
                    {""}
                    Annulla
                  </button>
                  <button onClick={() => functionName({ name, accountAddress })}>
                    <Image src={images.send} alt='send' width={30} height={30}></Image>
                    {""}
                    Conferma
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
      {error == "" ? "" : <Error error = {error} />}
    </div>
  );
}

export default Form