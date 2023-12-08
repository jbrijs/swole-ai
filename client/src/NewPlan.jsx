import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ExerciseInput from "./ExerciseInput";

const initializePlan = (numWeeks, daysPerWeek, exercisesPerDay) => {
  return Array.from({ length: numWeeks }, () => ({
    days: Array.from({ length: daysPerWeek }, () => ({
      exercises: Array.from({ length: exercisesPerDay }, () => ({
        name: "",
        sets: 0,
        reps: 0,
        weight: 0,
      })),
    })),
  }));
};

function NewPlan() {
  const location = useLocation();
  const { numWeeks, daysPerWeek, exercisesPerDay } = location.state;
  const [plan, setPlan] = useState(
    initializePlan(numWeeks, daysPerWeek, exercisesPerDay)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleExerciseChange = (weekIndex, dayIndex, exerciseIndex, event) => {
    const newPlan = [...plan];
    const { name, value } = event.target;
    newPlan[weekIndex].days[dayIndex].exercises[exerciseIndex][name] = value;
    setPlan(newPlan);
  };

  return (
    <form className="flex flex-col justify-center items-center mt-10"onSubmit={handleSubmit}>
      {plan.map((week, weekIndex) => (
        <div key={weekIndex}>
          <h1 className="text-5xl font-light text-white mb-10" key={weekIndex}>Week {weekIndex + 1}</h1>
          {week.days.map((day, dayIndex) => (
            <div key={dayIndex}>
              <h1 className="text-2xl font-light text-tertiary pb-4" key={dayIndex}>Day {dayIndex + 1}</h1>
              <div className="flex flex-row items-center">
                <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">Exercise</p>
                <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">Sets</p>
                <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">Reps</p>
                <p className="w-1/4 text-center text-xl text-gray-700 font-semibold bg-secondary">Weight</p>
              </div>
              {day.exercises.map((exercise, exerciseIndex) => (
                <ExerciseInput
                  key={exerciseIndex}
                  exercise={exercise}
                  onChange={(e) =>
                    handleExerciseChange(weekIndex, dayIndex, exerciseIndex, e)
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit Plan</button>
    </form>
  );
}

export default NewPlan;
