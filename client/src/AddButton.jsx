import React from "react";
import AddIcon from "@mui/icons-material/Add";

function AddButton({ onClick }) {
  return (
    <button
      className="w-12 h-12 bg-secondary rounded-xl text-white hover:bg-tertiary mb-16"
      onClick={() => onClick()}
    >
      <AddIcon/>
    </button>
  );
}

export default AddButton;
