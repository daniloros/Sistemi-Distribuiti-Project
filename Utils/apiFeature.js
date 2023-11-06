import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from "../Context/constants";

export const CheckIfWalletConnected = async () => {
    try {
        if(!window.ethereum) return console.log("install metamask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } catch (error) {
        console.error(error);
    }
}


export const connectWallet = async (forceRefresh) =>{
    try {
        if(!window.ethereum) return console.log("install metamask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const firstAccount = accounts[0];
        if(forceRefresh){
            window.location.reload();
        }
        return firstAccount;
    } catch (error) {
        console.error("install metamask");
    }
}

export const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

export const connectingWithContract = async () => {
    try {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);

        return contract;
    } catch (error) {
        console.log(error);
    }
}

export const convertTime = (time) => {
    const timestampSeconds = Number(time) * 1000; // Moltiplica per 1000 per convertire in millisecondi
    const newTime = new Date(timestampSeconds);

    const hours = String(newTime.getHours()).padStart(2, '0');
    const minutes = String(newTime.getMinutes()).padStart(2, '0');
    const seconds = String(newTime.getSeconds()).padStart(2, '0');
    const day = String(newTime.getDate()).padStart(2, '0');
    const month = String(newTime.getMonth() + 1).padStart(2, '0');
    const year = newTime.getFullYear();

    const realTime = `Ora: ${hours}:${minutes}:${seconds} Date: ${day}/${month}/${year}`;

    return realTime;
}


