import React, {useEffect, useState, useContext} from 'react';

import { ChatAppContext } from "../Context/ChatAppContext";
import {Filter, Friend} from "../Components/index";

const ChatApp = () => {
    const { username } = useContext(ChatAppContext);
    if(username){
        return <div>
            <Filter />
            <Friend />
        </div>
    } else {
        return <div>
        </div>
    }

};


export default ChatApp;