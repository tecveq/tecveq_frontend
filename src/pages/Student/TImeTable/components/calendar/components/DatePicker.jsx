import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import FilterButton from "./FilterButton";
import TimePicker from "./TimePicker";

export default function DatePicker({
  date,
  setdate,
  open,
  setopen,
  className,
  minDate,
  maxDate,
}) {
  const ref = useRef();

  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } bg-white absolute top-10 rounded-lg ${
        className ? className : ""
      } date-picker-styles`}
      ref={ref}
      style={{ right: 0 }}
    >
      <Calendar
        value={date}
        view="week"
        onChange={(e) => {
          const targetDate = moment(e);

          const newDate = moment(date)
            .set("y", targetDate.get("y"))
            .set("M", targetDate.get("M"))
            .set("D", targetDate.get("D"));

          setdate(newDate);
        }}
        calendarType="US"
        minDate={minDate}
        maxDate={maxDate}
        next2Label={false}
        prev2Label={false}
        formatShortWeekday={(locale, date) => {
          return moment(date, "YYYY-MM-DD HH:mm:ss")
            .format("dddd")
            .substring(0, 1);
        }}
      />
      <hr />
      <div className="p-3">
        <p>Time Label</p>
        <div className="flex items-center justify-between">
          <TimePicker date={date} setdate={setdate} />
          <div className="h-10">
            <FilterButton
              text={"Save"}
              className={"px-7 h-full"}
              clickHandler={() => setopen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
