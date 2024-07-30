import { Circle } from "rc-progress";
import React from "react";

const LastDeliverables = () => {
  const DeliverableComponent = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full gap-2 bg-white rounded-md md:px-8 sm:flex-1 md:py-2 md:gap-3">
        <div className="flex flex-col items-center justify-center w-24 h-24 md:flex-row">
          <Circle
            percent={40}
            strokeColor={`#A41D30`}
            strokeWidth={12}
            trailColor="#EAECF0"
            trailWidth={12}
          />
          <div className="absolute flex flex-col items-center">
            <span className="text-[7px] md:text-[10px]">Submission</span>
            <div className="flex">
              <span className="text-[7px] text-base font-semibold">40 %</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-center">Submissions: 40/100</p>
      </div>
    );
  };

  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex">
          <p className="flex text-xl font-medium">Last Deliverables</p>
        </div>
        <div className="flex flex-col gap-1 px-3 py-5 bg-white rounded-lg custom-shadow">
          <div className="flex px-5 text-sm ">
            <div className="flex justify-center flex-1">
              <p>Assignment 3</p>
            </div>
          </div>
          <div className="flex flex-1 gap-2 p-2">
            <DeliverableComponent />
            <DeliverableComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastDeliverables;
