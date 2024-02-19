import React from "react";
import AddModalOption from "./AddModalOption";

function AddModal({ addExercise, addDay, addWeek, visibility }) {
  return (
    <div
      className="w-1/3 sm:w-1/4 flex flex-col justify-center items-center rounded-2xl bg-slate-50 divide-y-2 shadow-lg"
      hidden={!visibility}
    >
      <AddModalOption option="Day" onClick={() => addDay()} visibility={visibility} style={'pt-2 pb-1 rounded-t-xl'}/>
      <AddModalOption option="Week" onClick={() => addWeek()} visibility={visibility} style={'pb-2 pt-1 rounded-b-xl'}/>
    </div>
  );
}

export default AddModal;
