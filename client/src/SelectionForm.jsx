import React from "react";

function SelectionForm({value, label, name, onChange, options}) {
  return (
    <>
      <label
        className="text-2xl text-text pt-6 pb-2 sm:pb-1 sm:pt-4"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className="h-8 rounded-xl bg-slate-50 w-full text-center sm:text-left pl-2"
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