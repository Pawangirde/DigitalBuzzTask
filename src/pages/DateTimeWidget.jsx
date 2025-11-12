import React from "react";
import CustomDateTimePicker from "../components/CustomDateTimePicker.jsx";

export default function DateTimeWidget() {
  const handleSet = (date) => {
    alert("Selected Date & Time: " + date.format("MMM D, YYYY hh:mm A"));
  };

  const handleCancel = () => {
    alert("Date selection canceled.");
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Custom Date & Time Widget
      </h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-fit">
        <CustomDateTimePicker onSet={handleSet} onCancel={handleCancel} />
      </div>
    </div>
  );
}
