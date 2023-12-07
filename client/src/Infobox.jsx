import React, { useState } from "react";
import HelpIcon from "@mui/icons-material/Help";
import CancelIcon from  "@mui/icons-material/Cancel";
function Infobox() {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setIsMessageVisible(!isMessageVisible);
        }}
        className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl cursor-pointer border-2 border-slate-700 mt-4"
      >
        <div className="items-center justify-center flex flex-row">
          <p>Why are we asking for this information?</p>
          {!isMessageVisible && <HelpIcon className="mx-2"></HelpIcon>}
        </div>

        {isMessageVisible && (
          <div className="flex flex-row">
            <p>
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
