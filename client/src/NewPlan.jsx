import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExerciseInput from "./ExerciseInput";
import cookie from "cookie";
import NavButtons from "./NavButtons";
import ErrorMessage from "./ErrorMessage";

const initializePlan = (numWeeks, daysPerWeek, exercisesPerDay) => {
  return {
    name: "",
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

const addExercise = (weekIndex, dayIndex) => {
  setPlan((prevPlan) => {
    const newPlan = { ...prevPlan };
    const newWeeks = [...newPlan.weeks];
    const newWeek = { ...newWeeks[weekIndex] };
    const newDays = [...newWeek.days];
    const newDay = { ...newDays[dayIndex] };
    const newExercise = {
      name: "",
      sets: 0,
      reps: 0,
      weight: 0,
    };
    newDay.exercises = [...newDay.exercises, newExercise];
    newDays[dayIndex] = newDay;
    newWeeks.days = newDays;
    newWeeks[weekIndex] = newWeek;
    newPlan.weeks = newWeeks;
    return newPlan;
  });
};

const addDay = (weekIndex) => {
  setPlan((prevPlan) => {
    const newPlan = { ...prevPlan };
    const newWeeks = [...newPlan.weeks];
    const newWeek = { ...newWeeks[weekIndex] };

    const defaultExercise = {
      name: "",
      sets: 0,
      reps: 0,
      weight: 0,
    };

    const newDay = {
      name: `Day ${newWeek.days.length + 1}`,
      exercises: [defaultExercise],
    };
    newWeek.days = [...newWeek.days, newDay];
    newWeeks[weekIndex] = newWeek;
    newPlan.weeks = newWeeks;
  });
};

const addWeek = () => {
  setPlan((prevPlan) => {
    const newPlan = { ...prevPlan };
    const defaultExercise = {
      name: "",
      sets: 0,
      reps: 0,
      weight: 0,
    };
    const defaultDay = {
      name: "Day 1",
      exercises: [defaultExercise],
    };
    const newWeek = {
      days: [defaultDay],
    };

    newPlan.weeks = [...newPlan.weeks, newWeek];
    return newPlan;
  });
};

const removeExercise = (weekIndex, dayIndex, exerciseIndex) => {
  setPlan((prevPlan) => {
    const newPlan = { ...prevPlan };
    const newWeeks = [...newPlan.weeks];
    const newWeek = { ...newWeeks[weekIndex] };
    const newDays = [...newWeek.days];
    const newDay = { ...newDays[dayIndex] };
    newDay.exercises = newDay.exercises.filter(
      (_, index) => index !== exerciseIndex
    );
    newDays[dayIndex] = newDay;
    newWeek.days = newDays;
    newWeeks[weekIndex] = newWeek;
    newPlan.weeks = newWeeks;
    return newPlan;
  });
};

const removeDay = (weekIndex, dayIndex) => {
  setPlan((prevPlan) => {
    const newPlan = { ...prevPlan };
    const newWeeks = [...newPlan.weeks];
    const newWeek = { ...newWeeks[weekIndex] };
    newWeek.days = newWeek.days.filter((_, index) => index !== dayIndex);
    newWeeks[weekIndex] = newWeek;
    newPlan.weeks = newWeeks;
    return newPlan;
  });
};

const removeWeek = () => {
  setPlan((prevPlan) => {
    const newPlan = { ...prevPlan };
    const newWeeks = prevPlan.weeks.filter(
      (_, index) => index !== prevPlan.weeks.length() - 1
    );
    newPlan.weeks = newWeeks;
    return newPlan;
  });
};

function NewPlan() {
  const location = useLocation();
  const { numWeeks, daysPerWeek, exercisesPerDay } = location.state;
  const [plan, setPlan] = useState(
    initializePlan(numWeeks, daysPerWeek, exercisesPerDay)
  );
  const [currentWeek, setCurrentWeek] = useState(0);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

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
    if (res.ok) {
      navigate("/");
    } else {
      const errorData = await res.json();
      console.log(errorData.error);
      setErrorMessage(errorData.error);
    }
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
      <div className="flex flex-col h-full items-center justify-center w-full">
        <form className="w-3/4 my-10" onSubmit={createPlan}>
          <h1 className="text-5xl font-light text-text my-10" key={currentWeek}>
            Week {currentWeek + 1}
          </h1>
          <div className="h-4">
            {errorMessage && <ErrorMessage message={errorMessage} />}
          </div>

          <NavButtons
            currentWeek={currentWeek}
            setCurrentWeek={setCurrentWeek}
            savePlan={createPlan}
            numWeeks={numWeeks}
            canSave={true}
          />
          {plan.weeks[currentWeek].days.map((day, dayIndex) => (
            <div key={dayIndex}>
              <h1 className="text-2xl text-text pb-2 pt-6" key={dayIndex}>
                Day {dayIndex + 1}
              </h1>
              <div className="flex flex-row items-center">
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary py-3">
                  Exercise
                </p>
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary py-3 border-l-2 border-r-2 border-background">
                  Sets
                </p>
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary py-3 border-r-2 border-background">
                  Reps
                </p>
                <p className="w-1/4 text-center text-xl text-white font-semibold bg-secondary py-3">
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
                  editable={true}
                />
              ))}
            </div>
          ))}
        </form>
      </div>
    </>
  );
}
export default NewPlan;
