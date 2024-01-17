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
        <div>
          <NumberForm
            value={numWeeks}
            label="Weeks"
            name="weeks"
            min={1}
            max={12}
            onChange={(e) => setNumWeeks(e.target.value)}
          />
          <NumberForm
            value={daysPerWeek}
            label="Days Per Week"
            name="days per week"
            min={1}
            max={7}
            onChange={(e) => setDaysPerWeek(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-accent text-white rounded"
            onClick={() => onHide()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-secondary text-white rounded"
            onClick={() => onContinue()}
          >
            Continue to Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanInfoModal;
