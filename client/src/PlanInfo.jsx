import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NumberForm from './NumberForm'; // Make sure this path is correct

function PlanInfo() {
  const [numWeeks, setNumWeeks] = useState(1);
  const [daysPerWeek, setDaysPerWeek] = useState(1);
  const [exercisesPerDay, setExercisesPerDay] = useState(1);
  const navigate = useNavigate();

  const goToNewPlan = (event) => {
    event.preventDefault();
    navigate('/create_new_plan', { state: { numWeeks, daysPerWeek, exercisesPerDay } });
  };

  return (
    <div className="flex flex-col justify-center items-center m-20">
      <form onSubmit={goToNewPlan} className="flex flex-col items-start w-1/2">
        <h2 className="text-5xl mb-10 font-light text-text">
          Plan Information
        </h2>
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
          className="my-4 h-12 bg-secondary rounded-xl px-8 mt-8 text-white hover:bg-tertiary transition ease-in duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PlanInfo;
