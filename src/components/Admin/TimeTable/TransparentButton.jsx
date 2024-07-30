import React from "react";

export default function TransparentButton({
  icon,
  text,
  clickHandler,
  className,
  style,
  disabled,
}) {
  return (
    <button
      disabled={disabled ? disabled : false}
      className={`border border-black py-3 rounded-md flex gap-1 items-center justify-center ${className}`}
      onClick={clickHandler}
      style={style}
    >
      {icon && <img src={icon} />}
      {text}
    </button>
  );
}
