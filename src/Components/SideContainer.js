import "./SideContainer.css";
import React from "react";


export const SideContainer = ({ width, height, children }) => {

  return (
      <>
        <h1> Your Hazard List</h1>
        {children}
      </>
  );
};

export default SideContainer;
