import React, { useEffect, useRef, useState } from "react";
import useClickOutside from "../../../../../../hooks/useClickOutlise";
import IMAGES from "../../../../../../assets/images";

export default function SelectInpuMain({
  options,
  defaultValue,
  className,
  setvalue,
  selectedValue,
}) {
  const [selected, setselected] = useState(defaultValue);
  const [showDropdown, setshowDropdown] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setshowDropdown(false));

  useEffect(() => {
    setselected(selectedValue ? selectedValue : defaultValue);
  }, [selectedValue]);

  return (
    <div className="relative whitespace-nowrap">
      <div
        className={`flex justify-between cursor-pointer items-center bg-custom-light-2 p-2 rounded-lg border gap-3 ${
          className ? className : ""
        }`}
        onClick={() => setshowDropdown(!showDropdown)}
      >
        <p>{selected.name}</p>
        <img src={IMAGES.CheckArrow} />
      </div>
      {showDropdown && (
        <div
          ref={ref}
          className="absolute z-50 w-full bg-white rounded-lg"
          style={{ boxShadow: "0px 4px 10px 0px #0000001A" }}
        >
          <p className="py-2 pl-2 capitalize border-b cursor-default pr-14">
            {defaultValue.name}
          </p>

          {options.map((option, index) => {
            return (
              <p
                onClick={() => {
                  setvalue(option);
                  setselected(option);
                  setshowDropdown(false);
                }}
                className="py-2 pl-2 capitalize transition-all cursor-pointer pr-14 hover:text-custom-green-1 hover:bg-custom-light-2"
              >
                {option.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
