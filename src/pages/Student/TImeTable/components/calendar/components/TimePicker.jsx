import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "react-calendar/dist/Calendar.css";

const TimePickerComp = ({ date, setdate }) => {
  const [timeType, settimeType] = useState(
    moment(date).get("hours") >= 12 ? "pm" : "am"
  );

  const handleHourChange = (e) => {
    if (e.target.value <= 12 && e.target.value >= 0) {
      setdate(moment(date).set("hours", e.target.value));
    }
  };

  const handleMinuteChange = (e) => {
    if (e.target.value <= 60 && e.target.value >= 0) {
      setdate(moment(date).set("minutes", e.target.value));
    }
  };
  useEffect(() => {
    if (timeType == "pm") {
      if (moment(date).get("hours") <= 12) {
        setdate(moment(date).set("hours", moment(date).get("hours") + 12));
      }
      // if (moment(date).get("hours") < 12) {
      //   setdate(moment(date).set("hours", moment(date).get("hours") + 12));
      // }
      // if (moment(date).get("hours") == 12) {
      //   setdate(moment(date).set("hours", moment(date).get("hours") - 12));
      // }
    } else {
      if (moment(date).get("hours") >= 12) {
        setdate(moment(date).set("hours", moment(date).get("hours") - 12));
      }
      // if (moment(date).get("hours") > 12) {
      //   setdate(moment(date).set("hours", moment(date).get("hours") - 12));
      //   if (moment(date).get("hours") == 12) {
      //     setdate(moment(date).set("hours", moment(date).get("hours") + 12));
      //   }
      // }
    }
  }, [timeType]);

  useEffect(() => {
    settimeType(moment(date).get("hours") >= 12 ? "pm" : "am");
  }, [date]);

  return (
    <div className="text-md">
      <div className="flex justify-between">
        <div className="flex gap-2 rounded-lg">
          <div className="relative h-full">
            <input
              type="number"
              min={0}
              max={12}
              defaultValue={0}
              onChange={handleHourChange}
              value={
                moment(date).get("hours") > 12
                  ? moment(date).get("hours") - 12
                  : moment(date).get("hours")
              }
              className="bg-custom-light-2 border outline-none rounded-lg font-bold text-center w-[50px] h-full"
            />
            <p className="font-bold absolute z-10 top-0 text-2xl right-0 mt-[3px] mr-1">
              :
            </p>
          </div>
          <input
            type="number"
            min={0}
            max={60}
            defaultValue={0}
            value={moment(date).get("minutes")}
            onChange={handleMinuteChange}
            className="bg-custom-light-2 border outline-none rounded-lg font-bold text-center w-[50px]"
          />
          <div className="flex overflow-hidden border rounded-lg cursor-pointer">
            <p
              className={`p-2 ${
                timeType == "am" ? "bg-custom-green-1 text-white" : "bg-white"
              }`}
              onClick={() => settimeType("am")}
            >
              AM
            </p>
            <p
              className={`p-2 ${
                timeType == "pm" ? "bg-custom-green-1 text-white" : "bg-white"
              }`}
              onClick={() => settimeType("pm")}
            >
              PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePickerComp;
