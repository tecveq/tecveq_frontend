import React from "react";
import FilterButton from "./FilterButton";
import TransparentButton from "./TransparentButton";

const ConfirmModal = ({ isOpen, title, description, onconfirm, onclose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed w-full h-full top-0 left-0 z-50 bg-[rgba(0,0,0,0.4)] flex justify-center items-center cursor-default">
          <div className="w-[400px] max-w-[100vw] bg-white text-black p-5 rounded-lg flex flex-col gap-5">
            <p className="text-xl font-bold text-center">{title}</p>
            <p className="font-medium text-center">{description}</p>
            <div className="flex justify-end gap-5">
              <FilterButton
                text={"Confirm"}
                className={"px-3 py-1"}
                clickHandler={onconfirm}
              />
              <TransparentButton
                text={"Cancel"}
                clickHandler={onclose}
                className={"border-none"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
