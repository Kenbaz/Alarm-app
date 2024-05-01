// import React, { useState, useRef } from "react";

// function DigitalTimePicker() {
//   const [selectedHour, setSelectedHour] = useState(null);
//   const [selectedMinute, setSelectedMinute] = useState(null);
//   const hoursRef = useRef(null);
//   const minutesRef = useRef(null);

//   // Populate hours and minutes
//   const hours = Array.from({ length: 24 }, (_, i) =>
//     i.toString().padStart(2, "0")
//   );
//   const minutes = Array.from({ length: 60 }, (_, i) =>
//     i.toString().padStart(2, "0")
//   );

//   // Handle click event
//   const handleHourClick = (hour) => {
//     selectedHour === hour ? setSelectedHour(null) : setSelectedHour(hour)
//   };

//   const handleMinuteClick = (minute) => {
//     selectedMinute === minute ? setSelectedMinute(null) : setSelectedMinute(minute)
//   };

//   return (
//     <div className="time-picker">
//       <div className="hours" ref={hoursRef}>
//         {hours.map((hour) => (
//           <div
//             key={hour}
//             className={`hour ${hour === selectedHour ? "selected" : ""}`}
//             onClick={() => handleHourClick(hour)}
//           >
//             {hour}
//           </div>
//         ))}
//       </div>
//       <div className="minutes" ref={minutesRef}>
//         {minutes.map((minute) => (
//           <div
//             key={minute}
//             className={`minute ${minute === selectedMinute ? "selected" : ""}`}
//             onClick={() => handleMinuteClick(minute)}
//           >
//             {minute}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DigitalTimePicker;


// function generateHourOptions() {
//       let hoursHtml = "";
//       for (let i = 0; i <= 100; i++) {
//         const hour = i % 24;
//         hoursHtml += `<div>${hour < 10 ? "0" + hour : hour}</div>`;
//       }
//       return hoursHtml;
//     };

//     function generateMinuteOptions() {
//       let minutesHtml = "";
//       for (let i = 0; i < 60; i++) {
//         const minute = i;
//         minutesHtml += `<div>${minute < 10 ? "0" + minute : minute}</div>`;
//       }
//       return minutesHtml;
//   };