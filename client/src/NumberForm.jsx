import React from "react";

function NumberForm(content, label, name, onChange, min, max) {
  return (
    <>
      <label
        className="text-2xl text-white font-light pb-1 pt-4"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="p-1 rounded-xl bg-primary w-full pl-2"
        type="number"
        name={name}
        id={name}
        value={content}
        onChange={onChange}
        min={min}
        max={max}
      />
    </>
  );
}

export default NumberForm;
