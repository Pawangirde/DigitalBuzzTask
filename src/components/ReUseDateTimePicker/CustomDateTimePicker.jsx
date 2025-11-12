import React, { useState } from "react";
import dayjs from "dayjs";

export default function CustomDateTimePicker({ onSet, onCancel }) {
  const [show, setShow] = useState(true);
  const [selected, setSelected] = useState(dayjs());
  const [temp, setTemp] = useState(dayjs());
  const today = dayjs();

  const daysInMonth = temp.daysInMonth();
  const startDay = temp.startOf("month").day();

  const days = [];
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const handleDateClick = (d) => {
    const picked = temp.date(d);
    if (picked.isBefore(today, "day")) return;
    setTemp(picked);
  };

  const adjustTime = (unit, direction) => {
    const value = direction === "up" ? 1 : -1;
    if (unit === "hour") setTemp(temp.add(value, "hour"));
    else if (unit === "minute") setTemp(temp.add(value, "minute"));
  };

  const toggleAMPM = () => {
    const isPM = temp.hour() >= 12;
    setTemp(temp.hour(isPM ? temp.hour() - 12 : temp.hour() + 12));
  };

  const handleSet = () => {
    setSelected(temp);
    onSet?.(temp);
  };

  const handleCancel = () => {
    setTemp(selected);
    setShow(false);
    onCancel?.();
  };

  const quickSelect = (range) => {
    if (range === "today") setTemp(today.startOf("day"));
    else if (range === "7days") setTemp(today.subtract(7, "day"));
    else if (range === "month") setTemp(today.startOf("month"));
  };

  const hour = temp.format("hh");
  const minute = temp.format("mm");
  const ampm = temp.format("A");

  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Trigger Button */}
      <button
        className="w-full sm:w-auto px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-100"
        onClick={() => setShow(!show)}
      >
        {selected.format("MMM D, YYYY hh:mm A")}
      </button>

      {/* Popup */}
      {show && (
        <div className="flex-1 mt-3 sm:mt-6 bg-gray-900 border border-gray-700 shadow-2xl rounded-xl p-4 w-auto sm:w-90 z-50 text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <button
              onClick={() => setTemp(temp.subtract(1, "month"))}
              className="text-gray-400 hover:text-white"
            >
              &lt;
            </button>
            <div className="font-semibold text-white text-sm sm:text-base">
              {temp.format("MMMM YYYY")}
            </div>
            <button
              onClick={() => setTemp(temp.add(1, "month"))}
              className="text-gray-400 hover:text-white"
            >
              &gt;
            </button>
          </div>
          {/* Quick Ranges */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-[10px] sm:text-xs">
            {[
              { label: "Today", key: "today" },
              { label: "Last 7 Days", key: "7days" },
              { label: "This Month", key: "month" },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => quickSelect(btn.key)}
                className="py-1 px-2 rounded-md bg-gray-800 text-white hover:bg-blue-600 transition-all font-medium"
              >
                {btn.label}
              </button>
            ))}
          </div>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm mb-5 font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-medium text-gray-400">
                {d}
              </div>
            ))}
            {days.map((d, idx) => {
              if (!d) return <div key={idx}></div>;
              const date = temp.date(d);
              const isPast = date.isBefore(today, "day");
              const isSelected = date.isSame(temp, "day");
              return (
                <button
                  key={idx}
                  disabled={isPast}
                  onClick={() => handleDateClick(d)}
                  className={`p-1.5 sm:p-2 rounded-md w-8 h-8 sm:w-9 sm:h-9 text-xs sm:text-sm transition-all ${
                    isSelected
                      ? "bg-cyan-400 text-white"
                      : isPast
                      ? "text-gray-500 cursor-not-allowed"
                      : "text-white hover:bg-blue-700"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
          {/* Time Picker */}
          {/* Time Picker */}{" "}
          <div className="flex items-center justify-center gap-4 mb-4">
            {" "}
            {/* Hours */}{" "}
            <div className="flex flex-col items-center">
              {" "}
              <button
                onClick={() => adjustTime("hour", "up")}
                className="text-gray-300 hover:text-blue-400"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-up-icon lucide-chevron-up"
                >
                  {" "}
                  <path d="m18 15-6-6-6 6" />{" "}
                </svg>{" "}
              </button>{" "}
              <div className="border border-gray-600 px-3 py-1 bg-white text-black rounded-md w-12 text-center font-medium">
                {" "}
                {hour}{" "}
              </div>{" "}
              <button
                onClick={() => adjustTime("hour", "down")}
                className="text-gray-300 hover:text-blue-400"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-down-icon lucide-chevron-down"
                >
                  {" "}
                  <path d="m6 9 6 6 6-6" />{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
            <span className="text-2xl font-semibold">:</span> {/* Minutes */}{" "}
            <div className="flex flex-col items-center">
              {" "}
              <button
                onClick={() => adjustTime("minute", "up")}
                className="text-gray-300 hover:text-blue-400"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-up-icon lucide-chevron-up"
                >
                  {" "}
                  <path d="m18 15-6-6-6 6" />{" "}
                </svg>{" "}
              </button>{" "}
              <div className="border border-gray-600 px-3 py-1 bg-white text-black rounded-md w-12 text-center font-medium">
                {" "}
                {minute}{" "}
              </div>{" "}
              <button
                onClick={() => adjustTime("minute", "down")}
                className="text-gray-300 hover:text-blue-400"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-down-icon lucide-chevron-down"
                >
                  {" "}
                  <path d="m6 9 6 6 6-6" />{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
            {/* AM/PM */}{" "}
            <div className="ml-3">
              {" "}
              <button
                onClick={toggleAMPM}
                className="border border-gray-600 px-3 py-2 rounded-md bg-gray-800 hover:bg-blue-700 transition-all font-medium"
              >
                {" "}
                {ampm}{" "}
              </button>{" "}
            </div>{" "}
          </div>
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-3 text-white font-semibold">
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-md hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSet}
              className="px-4 py-2 rounded-md hover:bg-blue-700 transition-all"
            >
              Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
