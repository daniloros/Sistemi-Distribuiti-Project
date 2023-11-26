import React, { useState, useEffect, useContext } from 'react';

import { UserCard } from '@/Components/index';
import Style from '../styles/alluser.module.css';
import { ChatAppContext } from '@/Context/ChatAppContext';


const alluser = () => {

    const { userLists, addFriends, filteredLists, account} = useContext(ChatAppContext);
    return (
        <div>
            <div className={Style.alluser_info}>
                <h1>Trova i tuoi amici</h1>
            </div>
            <div className={Style.alluser}>
                {filteredLists.map((el, i) => (
                    <UserCard key={i+1} el={el} i={i} addFriends={addFriends} account={account}/>
                ))}
            </div>
        </div>
    )
};

export default alluser