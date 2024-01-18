import React from "react";

function AddRemoveButtons({
  type,
  addCondition,
  removeCondition,
  onAdd,
  onRemove,
}) {
  return (
    <>
      <div className="flex flex-row gap-4 mb-10 justify-center items-center">
        <button
          className={`flex flex-row items-center justify-center bg-secondary px-3 h-10 rounded-3xl text-md text-white hover:bg-tertiary transition ease duration-300 ${
            !removeCondition ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={!removeCondition}
          onClick={() => onRemove}
          type="button"
        >
          Remove {type}
        </button>
        <button
          className={`flex flex-row items-center justify-center bg-secondary px-3 h-10 rounded-3xl text-md text-white hover:bg-tertiary transition ease duration-300 ${
            !addCondition ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={!addCondition}
          onClick={() => onAdd}
          type="button"
        >
          Add {type}
        </button>
      </div>
    </>
  );
}

export default AddRemoveButtons;
