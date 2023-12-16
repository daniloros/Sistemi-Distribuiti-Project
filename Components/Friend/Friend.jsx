import React, {useState, useContext} from 'react';
import Image from "next/image";
import Style from './Friend.module.css';
import images from '../../assets';
import Card from "@/Components/Friend/Card/Card";
import Chat from "@/Components/Friend/Chat/Chat";
import {ChatAppContext} from "@/Context/ChatAppContext";


const Friend = () => {
    const {
        sendMessage,
        account,
        friendLists,
        readMessage,
        username,
        loading,
        friendMsg,
        currentUsername,
        currentUserAddress,
        readUser,
    } = useContext(ChatAppContext);
    return (
        <div className={Style.Friend}>
            <div className={Style.Friend_box}>
                <div className={Style.Friend_box_left}>
                    {
                        friendLists.map((el, i) => (
                            <Card
                                key={i + 1} el={el} i={i}
                                readMessage={readMessage}
                                readUser={readUser}
                            />
                        ))
                    }
                </div>
                <div className={Style.Friend_box_right}>
                    <Chat
                        functionName={sendMessage}
                        readMessage={readMessage}
                        friendMsg={friendMsg}
                        account={account}
                        username={username}
                        loading={loading}
                        currentUsername={currentUsername}
                        currentUserAddress={currentUserAddress}
                        readUser={readUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default Friend