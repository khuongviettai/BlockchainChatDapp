import React from "react";
import Style from "./Error.module.css";

const Error = ({ error }) => {
  return (
    <div className={Style.Error}>
      <div className={Style.Error_box}>
        <h1>Please fix this Error & Reload Brower</h1>
        {error}
      </div>
    </div>
  );
};

export default Error;
