import React from "react";
import NumberForm from "./NumberForm";
import { useState } from "react";

function PlanInfo() {
  const [numWeeks, setNumWeeks] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [exercisesPerDay, setExercisesPerDay] = useState(1);
  return (
    <>
    
      <div className="flex flex-col justify-center items-center m-20">
        <form className="flex flex-col items-start w-1/2">
        <h2 className="text-4xl font-light text-tertiary">
            Personal Information
          </h2>
          {NumberForm(
            numWeeks,
            "Number of weeks",
            "number of weeks",
            (e) => {
              setNumWeeks(e.value);
            },
            1,
            12
          )}
          {NumberForm(
            daysPerWeek,
            "Workouts per week",
            "days per week",
            (e) => {
              setDaysPerWeek(e.value);
            },
            1,
            7
          )}
          {NumberForm(
            daysPerWeek,
            "Exercises per workout",
            "exercises per workout",
            (e) => {
              setDaysPerWeek(e.value);
            },
            1,
            10
          )}{" "}
          <button
            type="submit"
            className="my-4 h-12 bg-secondary rounded-xl px-8 mt-8 text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PlanInfo;
