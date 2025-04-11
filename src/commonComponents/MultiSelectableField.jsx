import React from "react";

const CustomMultiSelectableField = ({
  label,
  options = [],
  selectedOption = [],
  setSelectedOption,
  isMulti = false,
}) => {
  const toggleSelection = (value) => {
    if (selectedOption.includes(value)) {
      setSelectedOption(selectedOption.filter((v) => v !== value));
    } else {
      setSelectedOption([...selectedOption, value]);
    }
  };

  return (
    <div className="flex flex-col py-1 text-start">
      <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="border border-gray-300 rounded-md p-2 max-h-40 overflow-y-auto space-y-1">
        {options.map((item) => (
          <label
            key={item._id}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
          >
            <input
              type="checkbox"
              checked={selectedOption.includes(item._id)}
              onChange={() => toggleSelection(item._id)}
              className="accent-blue-500"
            />
            <span className="text-sm text-gray-800">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomMultiSelectableField;
