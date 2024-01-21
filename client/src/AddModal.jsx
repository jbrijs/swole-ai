import React from "react";
import AddModalOption from "./AddModalOption";

function AddModal({ addExercise, addDay, addWeek, visibility }) {
  return (
    <div
      className={`w-1/4 flex flex-col items-center rounded-2xl bg-slate-50 divide-y-2 ${visibility ? 'border border-black' : ''}`}
      hidden={!visibility}
    >
      <AddModalOption option="Exercise" onClick={() => addExercise} visibility={visibility}/>
      <AddModalOption option="Day" onClick={() => addDay} visibility={visibility}/>
      <AddModalOption option="Week" onClick={() => addWeek} visibility={visibility}/>
    </div>
  );
}

export default AddModal;
