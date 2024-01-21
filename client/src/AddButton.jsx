import React from "react";
import AddIcon from "@mui/icons-material/Add";

function AddButton({ onClick }) {
  return (
    <button
      className="w-12 h-12 bg-secondary rounded-3xl text-white hover:bg-tertiary"
      onClick={() => onClick()}
    >
      <AddIcon/>
    </button>
  );
}

export default AddButton;
