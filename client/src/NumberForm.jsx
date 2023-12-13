import React from "react";

function NumberForm({ value, label, name, onChange, min, max }) {
  return (
    <>
      <label
        className="text-2xl text-text pb-1 pt-4"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="p-1 rounded-xl bg-slate-50 w-full pl-2"
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
