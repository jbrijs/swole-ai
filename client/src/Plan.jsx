import React, { useState } from "react";
import ExerciseInput from "./ExerciseInput";

function Plan({ userPlan, editable, handleExerciseChange, currentWeek }) {
  
 

  

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10 w-full">
        <div key={currentWeek} className="w-full">
          <h1 className="text-3xl font-light text-text mb-4" key={currentWeek}>
            Week {currentWeek + 1}
          </h1>
          {userPlan.weeks[currentWeek].days.map((day, dayIndex) => (
            <div key={dayIndex} className="w-full">
              <h1
                className="text-xl text-text pb-2"
                key={dayIndex}
              >
                Day {dayIndex + 1}
              </h1>
              <div className="flex flex-row items-center">
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary">
                  Exercise
                </p>
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary">
                  Sets
                </p>
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary">
                  Reps
                </p>
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary">
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
