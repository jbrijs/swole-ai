import React, { useState } from "react";
import ExerciseInput from "./ExerciseInput";

function Plan({ userPlan, editable }) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [plan, setPlan] = useState(userPlan);

  console.log(userPlan)
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
      <div className="flex flex-col justify-center items-center mt-10">
        <div key={currentWeek} className="w-3/4">
          <h1 className="text-3xl font-light text-white mb-4" key={currentWeek}>
            Week {currentWeek + 1}
          </h1>
          {plan.weeks[currentWeek].days.map((day, dayIndex) => (
            <div key={dayIndex} className="w-full">
              <h1
                className="text-2xl font-light text-tertiary pb-2"
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
                  exercise={exercise}
                  key={exerciseIndex}
                  editable={editable}
                  onChange={(e) =>
                    handleExerciseChange(
                      currentWeek,
                      dayIndex,
                      exerciseIndex,
                      e
                    )
                  }
                ></ExerciseInput>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Plan;
