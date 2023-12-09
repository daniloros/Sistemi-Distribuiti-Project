import React, {useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";

import Style from './Card.module.css';
import images from "../../../assets";

const Card = ({readMessage, el, i, readUser}) => {
    const maskPubkey = (pubkey) => {
        const firstString = pubkey.slice(0, 13);
        const secondString = pubkey.slice(-4);
        return firstString + '...' + secondString;
    };
    return (
        <Link href={{pathname: '/', query:{ name: `${el.name}`, address: `${el.pubkey}`}}}>
            <div className={Style.Card}
                 onClick={() =>(readMessage(el.pubkey), readUser(el.pubkey))}
            >
                <div className={Style.Card_box}>
                    <div className={Style.Card_box_left}>
                        <Image src={images.accountName} alt="username"
                               width={50} height={50}
                               className={Style.Card_box_left_img}
                        />
                    </div>
                    <div className={Style.Card_box_right}>
                        <div className={Style.Card_box_right_middle}>
                            <h4>{el.name}</h4>
                            <small>{maskPubkey(el.pubkey)}</small>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;