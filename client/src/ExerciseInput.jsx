import React from "react";

function ExerciseInput({exercise, onChange})
 {
  return (
    <div>
      <input
        type="text"
        name="name"
        value={exercise.name}
        placeholder="Exercise Name"
        onChange={onChange}
        className="w-1/4 text-center border border-secondary bg-slate-200"
      />
      <input
        type="number"
        name="sets"
        value={exercise.sets}
        placeholder="Sets"
        onChange={onChange}
        className="w-1/4 text-center border border-secondary bg-slate-200"
      />
      <input
        type="number"
        name="reps"
        value={exercise.reps}
        placeholder="Reps"
        onChange={onChange}
        className="w-1/4 text-center border border-secondary bg-slate-200"
      />
      <input
        type="number"
        name="weight"
        value={exercise.weight}
        placeholder="Weight"
        onChange={onChange}
        className="w-1/4 text-center border border-secondary bg-slate-200"
      />
    </div>
  );
}

export default ExerciseInput;
