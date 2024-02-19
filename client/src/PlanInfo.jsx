import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberForm from "./NumberForm"; // Make sure this path is correct

function PlanInfo() {
  const [numWeeks, setNumWeeks] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [exercisesPerDay, setExercisesPerDay] = useState(1);
  const navigate = useNavigate();

  const goToNewPlan = (event) => {
    event.preventDefault();
    navigate("/create_new_plan", {
      state: { numWeeks, daysPerWeek, exercisesPerDay },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center mx-10 sm:mx-0 sm:my-20">
      <h2 className="text-4xl mt-10 mb-20 sm:my-10 font-light text-text">Plan Information</h2>
      <form onSubmit={goToNewPlan} className="flex flex-col gap-2 sm:gap-0 sm:items-start w-full sm:w-1/2">
        <NumberForm
          value={numWeeks}
          label="Number of weeks"
          name="number of weeks"
          onChange={(e) => setNumWeeks(e.target.value)}
          min={1}
          max={12}
        />
        <NumberForm
          value={daysPerWeek}
          label="Workouts per week"
          name="days per week"
          onChange={(e) => setDaysPerWeek(e.target.value)}
          min={1}
          max={7}
        />
        <NumberForm
          value={exercisesPerDay}
          label="Exercises per workout"
          name="exercises per workout"
          onChange={(e) => setExercisesPerDay(e.target.value)}
          min={1}
          max={10}
        />
        <button
          type="submit"
          className="w-full mt-40 sm:my-4 sm:w-auto h-12 bg-button rounded-xl px-8 mt-8 text-white shadow-md hover:bg-button_hover transition ease-in duration-150 shadow-xl"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PlanInfo;
