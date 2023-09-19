import React from "react";

export const Error = ({ msj }) => {
  return (
    <div className="bg-red-800 p-2 rounded-md text-white mb-3 text-center">
      <p>{msj}</p>
    </div>
  );
};
