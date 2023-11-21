import React from "react";

function TextForm(content, label, name, onChange, type) {
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
        type={type}
        name={name}
        id={name}
        value={content}
        onChange={onChange}
      />
    </>
  );
}

export default TextForm;
