import React from "react";
import AddIcon from "@mui/icons-material/Add";

function AddButton({ onClick }) {
  return (
    <button
      className="w-12 h-12 bg-button shadow-md rounded-xl text-white hover:bg-button_hover shadow-xl transition ease-in duration-150"
      onClick={() => onClick()}
    >
      <AddIcon/>
    </button>
  );
}

export default AddButton;
