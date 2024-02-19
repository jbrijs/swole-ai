import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function ExerciseInput({ exercise, onChange, editable, onDelete }) {
  let className = "";
  editable
    ? (className =
        "w-1/4 text-center border-r border-l border-b border-gray-400 bg-slate-200 sm:py-1")
    : (className =
        "w-1/4 text-center border-r border-l border-b border-gray-400 bg-slate-100 sm:py-1");
  let exerciseClassName = "";
  editable
    ? (exerciseClassName =
        "sm:w-1/4 w-1/2 text-center border-r border-l border-b border-gray-400 bg-slate-200 sm:py-1")
    : (className =
        "sm:w-1/4 w-1/2 text-center border-r border-l border-b border-gray-400 bg-slate-100 sm:py-1");
  let deleteClassName = "";
  editable
    ? (deleteClassName =
        "bg-slate-200 border-r border-l border-b border-gray-400")
    : (deleteClassName =
        "bg-slate-100 border-r border-l border-b border-gray-400");

  return (
    <div className="w-full flex">
      <input
        type="text"
        name="name"
        value={exercise.name == null ? "Exercise" : exercise.name}
        placeholder="Exercise Name"
        onChange={onChange}
        className={exerciseClassName}
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
        min={0}
      />
      <input
        type="number"
        name="reps"
        value={exercise.reps == null ? 0 : exercise.reps}
        placeholder="Reps"
        onChange={onChange}
        className={className}
        readOnly={!editable}
        min={0}
      />
      <input
        type="number"
        name="weight"
        value={exercise.weight == null ? 0 : exercise.weight}
        placeholder="Weight"
        onChange={onChange}
        className={className}
        readOnly={!editable}
        min={0}
      />
      <button type="button" className={deleteClassName} onClick={onDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default ExerciseInput;
