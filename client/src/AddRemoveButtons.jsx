import React from "react";

function AddRemoveButtons({ type, addCondition, removeCondition, onAdd, onRemove}) {
  return (
    <>
      <button
        className={`flex flex-row items-center justify-center bg-secondary px-3 h-12 rounded-3xl text-xl text-white hover:bg-tertiary transition ease duration-300 ${
          removeCondition ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={removeCondition}
        onClick={() => onRemove}
        type="button"
      >
        Remove {type}
      </button>
      <button
        className={`flex flex-row items-center justify-center bg-secondary px-3 h-12 rounded-3xl text-xl text-white hover:bg-tertiary transition ease duration-300 ${
          addCondition ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={addCondition}
        onClick={() => onAdd}
        type="button"
      >
        Add {type}
      </button>
    </>
  );
}

export default AddRemoveButtons;
