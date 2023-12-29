import React, {useState, useEffect, useRef} from 'react';
import Image from "next/image";
import { useRouter} from "next/router";

import Style from './Chat.module.css';
import images from '../../../assets';
import {connectingWithContract, convertTime} from "@/Utils/apiFeature";
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
    const messagesEndRef = useRef(null);
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

    useEffect(() => {
        const checkForNewMessage = async () => {
            try {
                const contract = await connectingWithContract();

                contract.on("NewMessageReceived", async (sender, receiver, message) => {
                    if (receiver.toLowerCase() === account.toLowerCase()) {
                        window.location.reload();
                    }
                });

                return () => {
                    contract.off("NewMessageReceived");
                };
            } catch (error) {
                console.log(error);
            }
        };

        checkForNewMessage();
    }, [account, readMessage]);

    // Effetto per far scorrere la finestra verso il basso quando ci sono nuovi messaggi
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [readMessage]);


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
                            <div ref={messagesEndRef} />
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