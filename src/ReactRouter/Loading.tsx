import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="w-100 h-75 position-fixed">
      <div className="row w-100 h-100 justfiy-content-center align-items-center">
        <div className="col-6 text-center">
          <h3>Loading</h3>
          <ScaleLoader
            height="40px"
            width="60px"
            // radius: box 모서리 둥글게
            radius="2px"
            margin="2px"
          ></ScaleLoader>
        </div>
      </div>
    </div>
  );
};

export default Loading;
