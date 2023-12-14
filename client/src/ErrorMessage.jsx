import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="h-4 flex flex-col justify-center items-center">
      <p className="py-1 px-8 rounded-xl text-red-500 font-semibold bg-red-200 border-2 border-red-500">
        {message}
      </p>
    </div>
  );
}

export default ErrorMessage;
