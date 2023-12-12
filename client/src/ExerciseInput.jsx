import React from "react";

function ExerciseInput({ exercise, onChange, editable }) {
  let className = "";
  editable
    ? (className = "w-1/4 text-center border border-secondary bg-slate-200")
    : (className = "w-1/4 text-center border border-secondary bg-slate-400");

  return (
    <div>
      <input
        type="text"
        name="name"
        value={exercise.name == null ? "Exercise" : exercise.name}
        placeholder="Exercise Name"
        onChange={onChange}
        className={className}
        readOnly={!editable}
      />
      <input
        type="number"
        name="sets"
        value={exercise.sets == null ? 0 : exercise.sets}
        placeholder="Sets"
        onChange={onChange}
        className={className}
        readOnly={!editable}
      />
      <input
        type="number"
        name="reps"
        value={exercise.reps == null ? 0 : exercise.reps}
        placeholder="Reps"
        onChange={onChange}
        className={className}
        readOnly={!editable}
      />
      <input
        type="number"
        name="weight"
        value={exercise.weight == null ? 0 : exercise.weight}
        placeholder="Weight"
        onChange={onChange}
        className={className}
        readOnly={!editable}
      />
    </div>
  );
}

export default ExerciseInput;
