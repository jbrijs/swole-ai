import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function NavButtons({ currentWeek, setCurrentWeek, savePlan, numWeeks, canSave }) {
  return (
    <div className="flex w-full justify-end items-center gap-8">
      <div className="flex gap-2">
        <button
          className={`flex flex-row items-center justify-center bg-primary px-3 h-12 rounded-3xl text-xl text-black hover:text-white hover:bg-secondary transition ${
            currentWeek <= 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => currentWeek > 0 && setCurrentWeek(currentWeek - 1)}
          disabled={currentWeek <= 0}
          type="button"
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          className={`flex flex-row items-center justify-center bg-primary px-3 h-12 rounded-3xl text-xl text-black hover:text-white hover:bg-secondary transition ${
            currentWeek >= numWeeks - 1 ? "opacity-50 cursor-not-allowed" : ""
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
        className="flex flex-row items-center justify-center bg-primary px-3 h-12 rounded-2xl text-xl text-black hover:text-white hover:bg-secondary transition"
        onClick={savePlan}
        type="submit"
      >
        Save Plan
      </button>}
    </div>
  );
}

export default NavButtons;
