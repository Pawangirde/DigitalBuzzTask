import React, { useState, useEffect, useRef } from "react";
import MultiSelectOption from "./MultiselectOption.jsx";

export default function MultiSelect({
  placeholder = "Select...",
  loadOptions, 
  onChange,
  defaultValue = [],
}) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(defaultValue);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (loadOptions) {
      loadOptions().then(setOptions);
    }
  }, [loadOptions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (item) => {
    let newSelected;
    if (selected.includes(item)) {
      newSelected = selected.filter((s) => s !== item);
    } else {
      newSelected = [...selected, item];
    }
    setSelected(newSelected);
    onChange && onChange(newSelected);
  };

  const clearAll = () => {
    setSelected([]);
    setSearch("");
    onChange && onChange([]);
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-full sm:max-w-md relative" ref={dropdownRef}>
     

    
      <div
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onKeyDown={(e) => e.key === "Enter" && setOpen(!open)}
        className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 flex flex-wrap gap-2 items-center cursor-text min-h-[44px] focus-within:ring-2 focus-within:ring-blue-500 "
      >
        {selected.length > 0 ? (
          selected.map((item) => (
            <span
              key={item}
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full font-semibold break-words"
            >
              {item}
              <button
                className="ml-1 text-blue-500 hover:text-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelect(item);
                }}
              >
                ✕
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm truncate">{placeholder}</span>
        )}

        <span className="ml-auto text-gray-500 text-xs sm:text-sm">▼</span>
      </div>

      {open && (
        <div className="absolute left-0 right-0 sm:w-full border border-gray-200 dark:border-gray-700 mt-1 rounded-md shadow-lg max-h-60 overflow-auto z-50 text-gray-800 ">
          <div className="p-2 border-b border-gray-100 dark:border-gray-700">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <ul className="max-h-48 overflow-y-auto text-sm">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <MultiSelectOption
                  key={item}
                  label={item}
                  selected={selected.includes(item)}
                  onToggle={() => toggleSelect(item)}
                />
              ))
            ) : (
              <li className="px-3 py-2 text-gray-600 text-center">
                No options found
              </li>
            )}
          </ul>

          {selected.length > 0 && (
            <div className="p-2 border-t border-gray-100 dark:border-gray-700 text-right">
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                CLEAR ALL
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
