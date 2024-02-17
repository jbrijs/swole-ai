import React from "react";
import { useNavigate } from "react-router-dom";

function ProceedModal({
  sex,
  age,
  goal,
  experience,
  hidden,
  onHide,
  onContinue,
}) {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="w-1/3 h-auto shadow-2xl flex flex-col items-center p-6 bg-white rounded-lg">
        <h1 className="mb-4 text-xl font-bold">
          Would you like to continue with these options?
        </h1>
        <span className="mb-2 font-bold">
          Sex: <span className="font-normal">{sex}</span>
        </span>
        <span className="mb-2 font-bold">
          Age: <span className="font-normal">{age}</span>
        </span>
        <span className="mb-2 font-bold">
          Goal: <span className="font-normal">{goal}</span>
        </span>
        <span className="mb-4 font-bold">
          Experience: <span className="font-normal">{experience}</span>
        </span>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-accent text-white rounded"
            onClick={() => onHide()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-button text-white rounded shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
            onClick={() => onContinue()}
          >
            Continue
          </button>
          <button
            className="px-4 py-2 bg-button text-white rounded shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
            onClick={() => navigate("/profile")}
          >
            Edit Options
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProceedModal;
