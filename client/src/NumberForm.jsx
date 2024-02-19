import React from "react";

function NumberForm({ value, label, name, onChange, min, max }) {
  return (
    <>
      <label
        className="text-2xl text-textpt-6 pb-2 sm:pb-1 sm:pt-4"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="py-1 rounded-xl bg-slate-50 w-full sm:pl-2 text-center sm:text-start"
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
