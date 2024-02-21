import React from "react";

function NumberForm({ value, label, name, onChange, min, max }) {
  return (
    <>
      <label
        className="text-gray-700 font-semibold text-text text-lg pt-4 pb-1 sm:pb-1 sm:pt-6"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="py-1 rounded-md bg-slate-200 border border-slate-300 h-10 w-full sm:pl-2 text-center sm:text-start"
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
    </>
  );
}

export default NumberForm;
