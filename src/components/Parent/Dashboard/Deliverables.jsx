import React from "react";

const Deliverables = () => {

    const data = [
        {
            type:"Assignment",
            number:2,
            dueDate:"24th jan, 2024",
            duetime: "8:30 PM",
            subject:"Mathematics",
            id:1
        },
        {
            type:"Quiz",
            number:3,
            dueDate:"24th jan, 2024",
            duetime: "8:30 PM",
            subject:"Statistics",
            id:2
        },
        {
            type:"Assignment",
            number:4,
            dueDate:"24th jan, 2024",
            duetime: "11:30 PM",
            subject:"Mathematics",
            id:3
        },
    ]

  const Deliverable = ({item}) => {
    return (
      <div className="flex w-full px-2 py-1 bg-white rounded-lg custom-shadow">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div className="flex gap-2 py-2">
              <div className="flex flex-col items-center justify-center px-2 text-lg rounded-md text-orange bg-orange_light">
                <div className="flex gap-1">
                  <p className="h-4">+</p>
                  <p className="h-4">-</p>
                </div>
                <div className="flex gap-1">
                  <p className="">x</p>
                  <p className="">=</p>
                </div>
              </div>
              <div className="">
                <p className="text-base font-medium">{item.type} {item.number}</p>
                <p className="text-xs text-black/50">Due date 24th jan, 2024 - 8:30 PM</p>
              </div>
            </div>
            <div className="flex justify-end">
                <div>
                <p className="px-3 py-1 text-white bg-maroon rounded-3xl" style={{fontSize:8}}>{item.subject}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex flex-1">
      <div className="flex flex-col flex-1 gap-2">
        <div className="flex flex-col">
          <p className="text-lg font-medium">Deliverables</p>
        </div>
        <div className="flex flex-col flex-1 gap-1 px-4 py-4 overflow-auto bg-white border-t-4 h-60 rounded-xl border-t-maroon">
            {data.map((item) => (
                <Deliverable item={item} key={item.id} />
            ) )}
        </div>
      </div>
    </div>
  );
};

export default Deliverables;
