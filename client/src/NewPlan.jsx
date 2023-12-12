import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ExerciseInput from "./ExerciseInput";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import cookie from "cookie";



const initializePlan = (numWeeks, daysPerWeek, exercisesPerDay) => {
  return {
    name: "", // You can allow users to set this name
    weeks: Array.from({ length: numWeeks }, (_, weekIndex) => ({
      days: Array.from({ length: daysPerWeek }, (_, dayIndex) => ({
        name: `Day ${dayIndex + 1}`, 
        exercises: Array.from({ length: exercisesPerDay }, () => ({
          name: "",
          sets: 0,
          reps: 0,
          weight: 0,
        })),
      })),
    })),
  };
};

function NewPlan() {
  const location = useLocation();
  const { numWeeks, daysPerWeek, exercisesPerDay } = location.state;
  const [plan, setPlan] = useState(
    initializePlan(numWeeks, daysPerWeek, exercisesPerDay)
  );
  const [currentWeek, setCurrentWeek] = useState(0);

  async function createPlan(e) {
    e.preventDefault();
    const res = await fetch("/api/create_plan", {
      method: "post",
      credentials: "same-origin",
      body: JSON.stringify(plan),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookie.parse(document.cookie).csrftoken,
      },
    });
  }


  const handleExerciseChange = (weekIndex, dayIndex, exerciseIndex, event) => {
    const { name, value } = event.target;

    setPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan };
      const updatedWeeks = [...updatedPlan.weeks];
      const updatedWeek = { ...updatedWeeks[weekIndex] };
      const updatedDays = [...updatedWeek.days];
      const updatedDay = { ...updatedDays[dayIndex] };
      const updatedExercises = [...updatedDay.exercises];
      const updatedExercise = { ...updatedExercises[exerciseIndex] };

      updatedExercise[name] = value;

      updatedExercises[exerciseIndex] = updatedExercise;
      updatedDay.exercises = updatedExercises;
      updatedDays[dayIndex] = updatedDay;
      updatedWeek.days = updatedDays;
      updatedWeeks[weekIndex] = updatedWeek;
      updatedPlan.weeks = updatedWeeks;

      return updatedPlan;
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <form
          className="flex flex-col justify-center items-center mt-10"
          onSubmit={createPlan}
        >
          <div key={currentWeek}>
            <h1
              className="text-5xl font-light text-white mb-10"
              key={currentWeek}
            >
              Week {currentWeek + 1}
            </h1>
            {plan.weeks[currentWeek].days.map((day, dayIndex) => (
              <div key={dayIndex}>
                <h1
                  className="text-2xl font-light text-tertiary pb-2 pt-6"
                  key={dayIndex}
                >
                  Day {dayIndex + 1}
                </h1>
                <div className="flex flex-row items-center">
                  <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">
                    Exercise
                  </p>
                  <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">
                    Sets
                  </p>
                  <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">
                    Reps
                  </p>
                  <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">
                    Weight
                  </p>
                </div>
                {day.exercises.map((exercise, exerciseIndex) => (
                  <ExerciseInput
                    key={exerciseIndex}
                    exercise={exercise}
                    onChange={(e) =>
                      handleExerciseChange(
                        currentWeek,
                        dayIndex,
                        exerciseIndex,
                        e
                      )
                    }
                  />
                ))}
              </div>
            ))}
          </div>
          {currentWeek + 1 == numWeeks && (
            <button
              className="bg-primary px-3 mt-10 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
              type="submit"
            >
              Submit Plan
            </button>
          )}
        </form>
        <div className="relative h-20 w-1/2 mt-10">
          {currentWeek > 0 && (
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="flex flex-row items-center justify-center absolute left-0 bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
            >
              <KeyboardArrowLeftIcon />
              Week {currentWeek}
            </button>
          )}
          {currentWeek < numWeeks - 1 && (
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="flex flex-row items-center justify-center absolute right-0 bg-primary px-3 h-12 rounded-lg text-xl text-black hover:text-white hover:bg-secondary transition"
            >
              Week {currentWeek + 2}
              <KeyboardArrowRightIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default NewPlan;
