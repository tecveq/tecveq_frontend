import React from "react";
import { HiOutlineCalendarDays } from "react-icons/hi2";

export default function FilterButton({
  icon,
  text,
  clickHandler,
  className,
  disabled,
}) {
  return (
    <button
      className={`text-white py-2 rounded-3xl flex gap-1 items-center justify-center bg-maroon ${className}`}
      onClick={clickHandler}
      disabled={disabled ? disabled : false}
    >
       <HiOutlineCalendarDays size={30} /> 
      {text}
    </button>
  );
}
