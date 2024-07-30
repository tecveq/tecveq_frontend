import React, { useContext, useEffect, useState } from "react";
import SideModal from "./SideModal";
import MainImg from "../../../../../assets/images/customer/booking-sidebar.png";
import InputField from "./InputField";
import SelectInputMain from "./SelectInputMain";
import FilterButton from "./FilterButton";
import DatePicker from "./DatePicker";
import IMAGES from "../../../../../../assets/images";
import moment from "moment";

export default function AddEventModal({ open, onclose, onsubmit, apiCalled }) {
  const [imgPreview, setimgPreview] = useState("");
  const [image, setimage] = useState("");
  const [eventName, seteventName] = useState("");
  const [fieldName, setfieldName] = useState(null);
  const [startDate, setstartDate] = useState(Date.now());
  const [endDate, setendDate] = useState(Date.now());
  const [startDatePickerOpen, setstartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setendDatePickerOpen] = useState(false);

  const [fieldNames, setfieldNames] = useState([]);

  const handleAddEvent = () => {
    if (eventName && fieldName && startDate < endDate)
      onsubmit({
        eventName,
        start: new Date(startDate),
        end: new Date(endDate),
        fieldId: fieldName.value,
      });
  };

  useEffect(() => {
    if (image) {
      setimgPreview(URL.createObjectURL(image));
    }
  }, [image]);

  useEffect(() => {
    setendDate(startDate);
  }, [startDate]);

  return (
    <SideModal open={open} onclose={onclose}>
      <div
        className="absolute top-0 left-0 w-[100%] h-[250px] flex flex-col justify-end text-white p-4 gap-2"
        style={{ backgroundImage: `url(${MainImg})` }}
      >
        <p className="text-3xl font-bold">Add Event</p>
      </div>
      <div className="mt-[210px] mx-4">
        <p className="text-xs text-red-500">Club’s Local Time*</p>
        <div className="flex flex-col gap-8 mt-5">
          <InputField
            hideIcon={true}
            placeholder={"Event Name"}
            changeHandler={(e) => {
              seteventName(e.target.value);
            }}
            value={eventName}
          />
          <SelectInputMain
            setvalue={setfieldName}
            defaultValue={{ name: "Field Name", value: "" }}
            options={fieldNames}
          />
          <div className="flex flex-col gap-3">
            <div className="relative px-3 py-2 border rounded-md bg-custom-light-2">
              <DatePicker
                minDate={new Date()}
                date={startDate}
                setdate={setstartDate}
                open={startDatePickerOpen}
                setopen={setstartDatePickerOpen}
              />
              <div
                className="flex justify-between gap-3"
                onClick={() => setstartDatePickerOpen(true)}
              >
                <p className="overflow-hidden whitespace-nowrap">
                  {moment(startDate).format("DD/MMM/YYYY hh:mm a")}
                </p>
                <img src={IMAGES.CheckArrow} />
              </div>
            </div>
            <p className="font-bold text-center">To</p>
            <div className="relative px-3 py-2 border rounded-md bg-custom-light-2">
              <DatePicker
                minDate={new Date(startDate)}
                date={endDate}
                setdate={setendDate}
                open={endDatePickerOpen}
                setopen={setendDatePickerOpen}
              />
              <div
                className="flex justify-between gap-3"
                onClick={() => setendDatePickerOpen(true)}
              >
                <p className="overflow-hidden whitespace-nowrap">
                  {moment(endDate).format("DD/MMM/YYYY hh:mm a")}
                </p>
                <img src={IMAGES.CheckArrow} />
              </div>
            </div>
          </div>
        </div>
        <FilterButton
          disabled={apiCalled}
          text={"Add Event"}
          className={"w-full mt-10"}
          clickHandler={handleAddEvent}
        />
      </div>
    </SideModal>
  );
}
