import React, { useState } from "react";

import { logEvent } from "firebase/analytics";
import { analytics, requestPermission } from "../firebase/firebase.js";

const NotificationDemo = () => {
  const [token, setToken] = useState("");

  const handleRequest = async () => {
    const userToken = await requestPermission();
    if (userToken) {
      setToken(userToken);
      logEvent(analytics, "notification_permission_granted");
    }
  };

  const handleTestNotification = () => {
    new Notification("Test Notification", {
      body: "This is a sample notification from your app!",
    });
  }; 

  return (
    <div className="flex flex-col  min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Firebase Push Notification Demo
        </h1>
        <p className="text-gray-600 mb-6">
          Click below to enable notifications and test one.
        </p>

        <div className="gap-2">
          <button
            onClick={handleRequest}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all mr-2"
          >
            Enable Notifications
          </button>
          <button
            onClick={handleTestNotification}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-all gap-2"
          >
            Test Notification
          </button>{" "}
        </div>

        {token && (
          <div className="mt-4 text-sm break-all text-gray-500">
            <strong>Your FCM Token:</strong>
            <p className="mt-2">{token}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDemo;
