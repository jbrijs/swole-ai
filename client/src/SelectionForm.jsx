import React from "react";

function SelectionForm(content, label, name, onChange, options) {
  return (
    <>
      <label
        className="text-2xl text-white font-light pb-1 pt-4"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className="h-8 rounded-xl bg-primary w-1/2 pl-2"
        id={name}
        name={name}
        onChange={onChange}
        value={content}
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