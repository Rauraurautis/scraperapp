import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { useState } from "react";
import { postTokenToDb } from "./services/TokenDatabaseService";



const firebaseConfig = {
    apiKey: "AIzaSyCeagjf9RjwMu_FpcmsfRVYi8LEuLXOBQs",
    authDomain: "messaging-fa432.firebaseapp.com",
    projectId: "messaging-fa432",
    storageBucket: "messaging-fa432.appspot.com",
    messagingSenderId: "91200235592",
    appId: "1:91200235592:web:36677e95375dcf8b25907d"
};


export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);


export const getTokenFromUser = async () => {
    return getToken(messaging, { vapidKey: 'BGPOUheQ86B6s-Jh7RCDwaRZ8cVI33pcih3IIH9YZy8LsMHg9d0UOuboyI68Rxl8yHdxgINv7h8yQAdO4ddnFIs' }).then((currentToken) => {
        if (currentToken) {
            postTokenToDb({ token: currentToken, userAgent: navigator.userAgent }).then(res => console.log("Succesfully sent token to Firebase")).catch(error => console.error(error))

        } else {
            console.log('No registration token available. Request permission to generate one.');


        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });