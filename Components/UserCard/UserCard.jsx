import React from 'react';
import Image from 'next/image';

import Style from './UserCard.module.css';
import images from '../../assets';

const UserCard = ({ el, i, addFriends, account}) => {
  const maskPubkey = (pubkey) => {
    const firstString = pubkey.slice(0, 4);
    const secondString = pubkey.slice(-4);
    return firstString + '...' + secondString;
  };
  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image src={images[`image${i+1}`]}
          alt="user"
          width={100}
          height={100}
        ></Image>

        <div className={Style.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{maskPubkey(el.accountAddress)}</p>
          {
              account.toUpperCase() === el.accountAddress.toUpperCase() ? ('') : (
                  <button
                      onClick={() => addFriends({name: el.name, accountAddress: el.accountAddress})}
                  >
                    Aggiungi come amico
                  </button>
              )
          }
        </div>
      </div>
    </div>
  )
}

export default UserCard