/* eslint-disable no-undef */
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyA4qnpf04zpw3Pc3eE2WI1MYx4DL-U3og4",
  authDomain: "pushnotification-e1f4d.firebaseapp.com",
  projectId: "pushnotification-e1f4d",
  storageBucket: "pushnotification-e1f4d.firebasestorage.app",
  messagingSenderId: "112422107800",
  appId: "1:112422107800:web:1b4792d9858a1f3dbdaeed",
  measurementId: "G-584C14RD4D",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
