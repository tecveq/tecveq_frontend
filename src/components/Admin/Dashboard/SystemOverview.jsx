// import React from 'react'
// import IMAGES from '../../../assets/images'

// const SystemOverview = () => {
//   return (
//     <div>
//         <img src={IMAGES.graph} alt="" className='w-full h-full' />

//     </div>
//   )
// }

// export default SystemOverview
import React, { useEffect, useState } from 'react';
// import CanvasJSReact from '@canvasjs/react-charts';
import IMAGES from '../../../assets/images';

// import CanvasJSReact from '@canvasjs/react-charts';
// //var CanvasJSReact = require('@canvasjs/react-charts');
 
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const SystemOverview = () => {

const [CanvasJSChart, setCanvasJSChart] = useState(null);

useEffect(() => {
  const loadCanvasJS = async () => {
    // Dynamically import the library
    const module = await import('@canvasjs/react-charts');
    setCanvasJSChart(module.CanvasJSChart);
  };

  loadCanvasJS();
}, []);

  const options = {
    backgroundColor: "transparent",
    animationEnabled: true,
    toolTip: {
      shared: true,
    },
    axisX: {
      titleFontColor: "#00000090",
      fontFamily:"verdana",
      labelFontColor: "#00000080",
      tickThickness: 0,
      title:"Month",
      lineColor: "#00000020"
    },
    axisY: {
      interval: 200,
      titleFontColor: "#00000090",
      labelFontColor: "#00000080",
      title:"Active users",
      fontFamily:"verdana",
      gridColor: "#00000020",
      lineThickness: 0,
    },
    legend: {
      padding: 120,
      horizontalAlign: "right",
      verticalAlign: "top"
    },
    data: [
      {
        type: "spline",
        showInLegend: true,
        name: "students",
        dataPoints: [
          { y: 310, label: "Jan" },
          { y: 410, label: "Feb" },
          { y: 510, label: "Mar" },
          { y: 610, label: "Apr" },
          { y: 710, label: "May" },
          { y: 810, label: "Jun" },
          { y: 920, label: "Jul" },
          { y: 400, label: "Aug" },
          { y: 500, label: "Sept" },
          { y: 600, label: "Oct" },
          { y: 800, label: "Nov" },
          { y: 1000, label: "Dec" },
        ],
      },
      {
        type: "spline",
        showInLegend: true,
        name: "parents",
        dataPoints: [
          { y: 210, label: "Jan" },
          { y: 410, label: "Feb" },
          { y: 510, label: "Mar" },
          { y: 610, label: "Apr" },
          { y: 810, label: "May" },
          { y: 910, label: "Jun" },
          { y: 920, label: "Jul" },
          { y: 200, label: "Aug" },
          { y: 400, label: "Sept" },
          { y: 600, label: "Oct" },
          { y: 800, label: "Nov" },
          { y: 1000, label: "Dec" },
        ],
      },
    ],
  };

  // if (!CanvasJSChart) return <div>Loading...</div>;

  return (
    <div className='px-4 py-8 bg-white border border-black/20 rounded-lg'>
      <CanvasJSChart options={options} />
      {/* <div>
        <img src={IMAGES.graph} alt="" className='w-full h-full' />
      </div> */}
    </div>
  );
};

export default SystemOverview;
