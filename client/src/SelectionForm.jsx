import React from "react";

function SelectionForm({value, label, name, onChange, options}) {
  return (
    <>
      <label
        className="text-gray-700 font-semibold text-text text-lg pt-4 pb-1 sm:pb-1 sm:pt-6"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className="py-1 rounded-md bg-slate-200 border border-slate-300 h-10 w-full sm:pl-2 text-center sm:text-start"
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectionForm;