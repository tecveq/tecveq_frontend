// // import React from 'react'
// // import IMAGES from '../../../assets/images'

// // const SystemOverview = () => {
// //   return (
// //     <div>
// //         <img src={IMAGES.graph} alt="" className='w-full h-full' />

// //     </div>
// //   )
// // }

// // export default SystemOverview
// import React, { useEffect, useState } from 'react';
// // import CanvasJSReact from '@canvasjs/react-charts';
// import IMAGES from '../../../assets/images';

// // import CanvasJSReact from '@canvasjs/react-charts';
// // //var CanvasJSReact = require('@canvasjs/react-charts');
 
// // var CanvasJS = CanvasJSReact.CanvasJS;
// // var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// const SystemOverview = () => {

// // const [CanvasJSChart, setCanvasJSChart] = useState(null);

// // useEffect(() => {
// //   const loadCanvasJS = async () => {
// //     // Dynamically import the library
// //     const module = await import('@canvasjs/react-charts');
// //     setCanvasJSChart(module.CanvasJSChart);
// //   };

// //   loadCanvasJS();
// // }, []);

//   const options = {
//     backgroundColor: "transparent",
//     animationEnabled: true,
//     toolTip: {
//       shared: true,
//     },
//     axisX: {
//       titleFontColor: "#00000090",
//       fontFamily:"verdana",
//       labelFontColor: "#00000080",
//       tickThickness: 0,
//       title:"Month",
//       lineColor: "#00000020"
//     },
//     axisY: {
//       interval: 200,
//       titleFontColor: "#00000090",
//       labelFontColor: "#00000080",
//       title:"Active users",
//       fontFamily:"verdana",
//       gridColor: "#00000020",
//       lineThickness: 0,
//     },
//     legend: {
//       padding: 120,
//       horizontalAlign: "right",
//       verticalAlign: "top"
//     },
//     data: [
//       {
//         type: "spline",
//         showInLegend: true,
//         name: "students",
//         dataPoints: [
//           { y: 310, label: "Jan" },
//           { y: 410, label: "Feb" },
//           { y: 510, label: "Mar" },
//           { y: 610, label: "Apr" },
//           { y: 710, label: "May" },
//           { y: 810, label: "Jun" },
//           { y: 920, label: "Jul" },
//           { y: 400, label: "Aug" },
//           { y: 500, label: "Sept" },
//           { y: 600, label: "Oct" },
//           { y: 800, label: "Nov" },
//           { y: 1000, label: "Dec" },
//         ],
//       },
//       {
//         type: "spline",
//         showInLegend: true,
//         name: "parents",
//         dataPoints: [
//           { y: 210, label: "Jan" },
//           { y: 410, label: "Feb" },
//           { y: 510, label: "Mar" },
//           { y: 610, label: "Apr" },
//           { y: 810, label: "May" },
//           { y: 910, label: "Jun" },
//           { y: 920, label: "Jul" },
//           { y: 200, label: "Aug" },
//           { y: 400, label: "Sept" },
//           { y: 600, label: "Oct" },
//           { y: 800, label: "Nov" },
//           { y: 1000, label: "Dec" },
//         ],
//       },
//     ],
//   };

//   // if (!CanvasJSChart) return <div>Loading...</div>;

//   return (
//     <div className='px-4 py-8 bg-white border border-black/20 rounded-lg'>
//       {/* <CanvasJSChart options={options} /> */}
//       <div>
//         <img src={IMAGES.graph} alt="" className='w-full h-full' />
//       </div>
//     </div>
//   );
// };

// export default SystemOverview;


import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    Students: 4000,
    Parents: 2400,
    Teachers: 2400,
  },
  {
    name: 'Feb',
    Students: 3000,
    Parents: 1398,
    Teachers: 2210,
  },
  {
    name: 'Mar',
    Students: 2000,
    Parents: 9800,
    Teachers: 2290,
  },
  {
    name: 'Apr',
    Students: 2780,
    Parents: 3908,
    Teachers: 2000,
  },
  {
    name: 'May',
    Students: 1890,
    Parents: 4800,
    Teachers: 2181,
  },
  {
    name: 'June',
    Students: 2390,
    Parents: 3800,
    Teachers: 2500,
  },
  {
    name: 'July',
    Students: 3490,
    Parents: 4300,
    Teachers: 2100,
  },
  {
    name: 'Aug',
    Students: 3490,
    Parents: 4300,
    Teachers: 2100,
  },
  {
    name: 'Sept',
    Students: 3490,
    Parents: 4300,
    Teachers: 2100,
  },
  {
    name: 'Oct',
    Students: 3490,
    Parents: 4300,
    Teachers: 2100,
  },
  {
    name: 'Nov',
    Students: 3490,
    Parents: 4300,
    Teachers: 2100,
  },
  {
    name: 'Dec',
    Students: 3490,
    Parents: 4300,
    Teachers: 2100,
  },
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Students" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Parents" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Teachers" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}