import React from "react";

const ErrorHandling = ({ fetchError }) => {
  return (
    <div className="flex items-center justify-center h-[201px] mt-5">
      <p className="text-red-900 font-bold text-3xl">Error: {fetchError}</p>
    </div>
  );
};

export default ErrorHandling;
