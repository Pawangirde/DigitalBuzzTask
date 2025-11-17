import React from "react";
import { MultiSelect } from "../components/MultiSelectDropdown";

export default function DropdownWidget() {
  const loadPropertyTypes = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          "Office Space",
          "Plot",
          "Retail Shop",
          "Warehouse",
          "Apartment",
          "Villa",
          "Co-working",
        ]);
      }, 800);
    });
  };

  const handleChange = (selected) => {
    console.log("Selected values:", selected);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        Searchable Multi-Select Dropdown
      </h2>

      <MultiSelect
        label="Property Sub-Type*"
        placeholder="Choose property types..."
        loadOptions={loadPropertyTypes}
        onChange={handleChange}
      />
    </div>
  );
}
