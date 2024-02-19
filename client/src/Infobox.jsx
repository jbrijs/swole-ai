import React, { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import CancelIcon from "@mui/icons-material/Cancel";
function Infobox() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setIsMessageVisible(!isMessageVisible);
        }}
        className="mx-10 px-4 py-2 bg-slate-100 text-secondary font-medium rounded-xl cursor-pointer border-2 border-secondary mt-4 absolute bottom-20 sm:absolute sm:bottom-10"
      >
        <div className="items-center justify-center flex flex-row">
          {!isMessageVisible && (
            <>
              <p className="text-sm sm:text-base">Why are we asking for this information?</p>
              <HelpIcon className="mx-2"></HelpIcon>
            </>
          )}
        </div>

        {isMessageVisible && (
          <div className="flex flex-row">
            <p className="text-sm sm:text-base">
              We ask this information so the AI Trainer can make the best and
              most personalized plan for you!
            </p>
            <CancelIcon className="mx-2"></CancelIcon>
          </div>
        )}
      </div>
    </>
  );
}

export default Infobox;
