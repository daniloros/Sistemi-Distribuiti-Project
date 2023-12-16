import React, {useState, useEffect} from 'react';
import Image from "next/image";
import { useRouter} from "next/router";

import Style from './Chat.module.css';
import images from '../../../assets';
import{convertTime} from "@/Utils/apiFeature";
import{Loader} from "../../index";

const Chat = ({
                  functionName,
                  readMessage,
                  friendMsg,
                  account,
                  username,
                  loading,
                  currentUsername,
                  currentUserAddress,
                  readUser,
              }) => {
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState({
        name: "",
        address: ""
    });
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        setChatData({
            name: router.query.name,
            address: router.query.address,
        });
    }, [router.isReady]);

    useEffect(() => {
        if (router.query.name && router.query.address) {
            const newChatData = {
                name: router.query.name,
                address: router.query.address,
            };
            setChatData(newChatData);
            readMessage(newChatData.address);
            readUser(newChatData.address);
        }
    }, [router.query]);


    // console.log("chatData " + chatData.address, chatData.name);
    if(router.query.name){
        return (
            <div className={Style.chat}>
                {
                    currentUsername && currentUserAddress ? (
                        <div className={Style.Chat_user_info}>
                            <Image src={images.accountName} alt="image" width={70} height={70} />
                            <div className={Style.Chat_user_info_box}>
                                <h4>{currentUsername}</h4>
                                <p className={Style.show}>{currentUserAddress}</p>
                            </div>
                        </div>
                    ) : ( "")
                }
                <div className={Style.Chat_box_box}>
                    <div className={Style.Chat_box}>
                        <div className={Style.Chat_box_left}>
                            {
                                friendMsg.map((el, i) => (
                                    <div key={i + 1}>
                                        {el.sender === chatData.address ? (
                                            <div className={Style.Chat_box_right_title}>
                                                <Image src={images.accountName} alt="imageLeft" width={50} height={50} />
                                                <span>
                                                {chatData.name} {""}
                                                    <small>{convertTime(el.timestamp)}</small>
                                            </span>
                                            </div>
                                        ) : (
                                            <div className={Style.Chat_box_left_title} >
                                                <Image src={images.accountName} alt="image" width={50} height={50} />
                                                <span>
                                                {username} {""}
                                                    <small>{convertTime(el.timestamp)}</small>
                                            </span>
                                            </div>
                                        )}
                                        <div className={el.sender === chatData.address ?  Style.Chat_box_chat_message_left : Style.Chat_box_chat_message_right}>
                                        <p key={i + 1} style={el.sender === chatData.address ? {borderBottomRightRadius: '1.5rem'} : { backgroundColor: '#015C4B', borderBottomLeftRadius: '1.5rem'}} >
                                            {el.msg}
                                            {""}
                                            {""}
                                        </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {
                        currentUsername && currentUserAddress ? (
                            <div className={Style.Chat_box_send}>
                                <div className={Style.Chat_box_send_img}>
                                    <input type='text' placeholder="Scrivi il tuo messaggio.."
                                           onChange={(e) => setMessage((e.target.value))}
                                    />
                                    {
                                        loading == true ? (
                                            <Loader />
                                        ) : (
                                            <Image src={images.send} alt="file" width={50} height={50}
                                                   onClick={() => functionName({msg: message, address: router.query.address})}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        ) :  "" }
                </div>
            </div>
        );
    }

};

export default Chat;