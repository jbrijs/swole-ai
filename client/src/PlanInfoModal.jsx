import React from "react";
import { useNavigate } from "react-router-dom";
import NumberForm from "./NumberForm";
import { useState } from "react";

function PlanInfoModal({ hidden, onHide, onContinue }) {
  const navigate = useNavigate();
  const [numWeeks, setNumWeeks] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [onPlanInfo, setOnPlanInfo] = useState(true);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="w-1/3 h-auto shadow-2xl flex flex-col items-center p-6 bg-white rounded-lg">
        <h1 className="mb-4 text-xl font-bold">
          Please fill out these plan specifications:
        </h1>
        <div className="flex flex-col gap-6 justify-center items-center my-6">
          <div className="flex flex-row gap-4">
            <label className="font-semibold text-lg" htmlFor="weeks">
              Weeks:{" "}
            </label>
            <input
              className="border shadow-sm px-2 bg-slate-50 rounded-lg text-lg font-light"
              type="number"
              value={numWeeks}
              name="weeks"
              id="weeks"
              onChange={(e) => setNumWeeks(e.target.value)}
              min={1}
              max={12}
            />
          </div>
          <div className="flex flex-row gap-4">
            <label className="font-semibold text-lg" htmlFor="days">
              Days Per Week:{" "}
            </label>
            <input
              className="border shadow-sm px-2 bg-slate-50 rounded-lg text-lg font-light"
              type="number"
              value={daysPerWeek}
              name="days"
              id="days"
              min={1}
              max={7}
              onChange={(e) => setDaysPerWeek(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-accent text-white rounded"
            onClick={() => onHide()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-button text-white rounded shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
            onClick={onContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanInfoModal;
