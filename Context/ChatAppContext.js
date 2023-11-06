import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CheckIfWalletConnected, connectWallet, connectingWithContract } from "../Utils/apiFeature";

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({ children }) => {


    const [account, setAcccount] = useState("");
    const [username, setUsername] = useState("");
    const [friendLists, setFriendList] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [filteredLists, setFilteredLists] = useState([]);
    const [error, setError] = useState("");

    //CHAT USER DATA
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    //FETCH ALL DATA WHEN PAGE LOAD
    const fetchData = async() =>{
        try {
            //GET CONTRACT
            const contract = await connectingWithContract();

            //GET ACCOUNT
            const connectAccount = await connectWallet(false);
            setAcccount(connectAccount);

            //GET USERNAME
            const username = await contract.getUsername(connectAccount);
            setUsername(username);

            //GET MY FRIEND LIST
            const friendLists = await contract.getMyFriendList();
            setFriendList(friendLists);

            //GET ALL APP USERS LIST
            const userList = await contract.getAllAppUser();
            setUserLists(userList);

            const filteredList = userList.filter(user => {
                const address = user[1];
                return !friendLists.some(friend => friend[0] === address);
            });
            setFilteredLists(filteredList);

        } catch (error) {
            // setError("Please install and connect your Wallet");
            console.log(error);
        }
    };

    useEffect(() => {
        //carico i dati al caricamento della pagina
        fetchData();
    }, []);

    //leggo i messaggi degli amici
    const readMessage = async(friendAddress) =>{
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            console.log("al momento non hai messaggi");
        }
    };

    //CREATE ACCOUNT
    const createAccount = async ({ name, accountAddress }) => {
        try {
            // if(name || accountAddress) return setError("nome e account non possono essere vuoti");

            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            //attendo il caricamento dell'account
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    //ADD YOUR FRIEND
    const addFriends = async({ name, accountAddress }) =>{
        console.log("entrato");
        try {
            // if(name || accountAddress) return setError("non possono essere vuoti");

            const contract = await connectingWithContract();
            console.log(accountAddress);
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        } catch (error) {
            setError("errore mentre stai provando ad aggiungere un amico");
            console.log(error);
        }
    };

    //SEND MESSAGE TO YOUR FRIEND
    const sendMessage = async({msg, address}) => {
        try {
            // if(msg || address) setError("Inserisci il tuo messaggio");
            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address,msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            console.log("Hai annullato l'invio del messaggio");
        }
    };

    //READ USER INFO
    const readUser = async(userAddress) => {
        const contract = await connectingWithContract();
        const username = await contract.getUsername(userAddress);
        setCurrentUsername(username);
        setCurrentUserAddress(userAddress);
    };


    return(
        <ChatAppContext.Provider value = {{
            readMessage,
            createAccount,
            addFriends,
            sendMessage,
            readUser,
            connectWallet,
            CheckIfWalletConnected,
            account,
            username,
            friendLists,
            friendMsg,
            userLists,
            loading,
            error,
            currentUsername,
            currentUserAddress,
            filteredLists,
        }}>
            {children}
        </ChatAppContext.Provider>
    );
};
