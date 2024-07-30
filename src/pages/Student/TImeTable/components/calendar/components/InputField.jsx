import React from "react";
import IMAGES from "../../../../../../assets/images";

export default function InputField({
  placeholder,
  value,
  changeHandler,
  hideIcon,
  className,
  disabled,
  type,
  inputHandler,
  clickHandler,
  readOnly,
}) {
  return (
    <div
      onClick={clickHandler ? clickHandler : null}
      className={`${
        className ? className : ""
      } bg-custom-light-2 border rounded-md flex gap-3 p-2 w-full overflow-hidden mb-5 md:mb-0`}
    >
      {!hideIcon && <img src={IMAGES.Search} className="w-4" />}
      <input
        readOnly={readOnly ? readOnly : false}
        onInput={inputHandler}
        disabled={disabled}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        className="w-full min-w-0 bg-transparent outline-none"
      />
    </div>
  );
}
