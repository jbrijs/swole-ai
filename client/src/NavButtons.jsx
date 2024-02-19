import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function NavButtons({ currentWeek, setCurrentWeek, numWeeks}) {
  return (
    <div className="flex w-full justify-end items-center gap-8">
      <div className="flex gap-2">
        <button
          className={`flex flex-row items-center justify-center bg-button px-3 h-12 sm:h-14 sm:w-14 rounded-full text-xl text-white hover:bg-button_hover transition ease-in duration-150 ${
            currentWeek <= 0 ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={() => currentWeek > 0 && setCurrentWeek(currentWeek - 1)}
          disabled={currentWeek <= 0}
          type="button"
        >
          <KeyboardArrowLeftIcon />
        </button>
        <button
          className={`flex flex-row items-center justify-center bg-button px-3 h-12 sm:h-14 sm:w-14 rounded-full text-xl text-white hover:bg-button_hover transition ease-in duration-150 ${
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

      
    </div>
  );
}

export default NavButtons;
