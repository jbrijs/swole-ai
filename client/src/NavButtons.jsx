import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function NavButtons({ currentWeek, setCurrentWeek, savePlan, numWeeks, canSave }) {
  return (
    <div className="flex w-full justify-end items-center gap-8">
      <div className="flex gap-2">
        <button
          className={`flex flex-row items-center justify-center bg-secondary px-3 h-12 rounded-3xl text-xl text-white hover:bg-tertiary transition ease duration-300 ${
            currentWeek <= 0 ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={() => currentWeek > 0 && setCurrentWeek(currentWeek - 1)}
          disabled={currentWeek <= 0}
          type="button"
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          className={`flex flex-row items-center justify-center bg-secondary px-3 h-12 rounded-3xl text-xl text-white hover:bg-tertiary transition ease duration-300 ${
            currentWeek >= numWeeks - 1 ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={() =>
            currentWeek < numWeeks - 1 && setCurrentWeek(currentWeek + 1)
          }
          disabled={currentWeek >= numWeeks - 1}
          type="button"
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>

      {canSave && <button
        className="h-12 bg-secondary rounded-xl px-8 text-white hover:bg-tertiary transition ease-in duration-200"
        onClick={savePlan}
        type="submit"
      >
        Save Plan
      </button>}
    </div>
  );
}

export default NavButtons;
