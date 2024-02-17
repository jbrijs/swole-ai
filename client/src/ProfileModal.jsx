import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileModal({ hidden, onHide }) {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        hidden ? "hidden" : ""
      }`}
    >
      <div className="w-1/3 h-auto shadow-2xl flex flex-col items-center p-6 bg-white rounded-lg">
        <h1 className="mb-4 text-xl font-bold">
          You havent completed your profile yet. In order to give you the best
          possible plan, please fill it out.
        </h1>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-accent text-white rounded"
            onClick={() => onHide()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-button shadow-md text-white rounded hover:bg-button_hover shadow-xl transition ease-in duration-150"
            onClick={() => navigate("/profile")}
          >
            Continue to Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
