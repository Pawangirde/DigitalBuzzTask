import React from "react";

export default function MultiSelectOption({ label, selected, onToggle }) {
  return (
    <li
      onClick={onToggle}
      className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-200 ${
        selected
          ? "bg-blue-50 text-blue-600 font-medium"
          : " dark:text-black-700"
      }`}
    >
      {label}
    </li>
  );
}
