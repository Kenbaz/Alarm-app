import { useState } from "react";
import "./App.css";
import "./RepeatDays.css";
import "./TimePicker.css";
import "./Sound.css";
import "./Switch.css";
import "./Modal.css";
import "./utils/bling";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AlarmRoutes from "./components/AlarmRoutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function App() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [showRepeatDays, setShowRepeatDays] = useState(false);
  const [selectedSound, setSelectedSound] = useState(null );
  const daysOfWeek = [
    "Every Monday",
    "Every Tuesday",
    "Every Wednesday",
    "Every Thursday",
    "Every Friday",
    "Every Saturday",
    "Every Sunday",
  ];

  const soundOptions = [
    "/public/sounds/Alarm-sound1.mp3",
    "/public/sounds/Alarm-sound2.mp3",
    "/public/sounds/Alarm-sound3.mp3",
    "/public/sounds/Alarm-sound4.mp3",
    "/public/sounds/Alarm-sound5.mp3",
  ];

  function toggleDay(day) {
    const index = selectedDays.indexOf(day);
    if (index === -1) {
      setSelectedDays([...selectedDays, day]);
    } else {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    }
  }

  function getRepeatLabel() {
    let sortedDays = [...selectedDays];
    sortedDays.sort((a, b) => {
      // Defining the order in which the days should appear
      const order = [
        "Every Monday",
        "Every Tuesday",
        "Every Wednesday",
        "Every Thursday",
        "Every Friday",
        "Every Saturday",
        "Every Sunday",
      ];
      return order.indexOf(a) - order.indexOf(b);
    });

    const selectedAbbreviatedDays = sortedDays.map((day) => {
      if (day.startsWith("Every ")) {
        // Extracting everything after "Every "
        return day.substring(6, Math.min(9, day.length));
      }
      // Using the first three characters as the abbreviation
      return day.substring(0, 3);
    });

    if (sortedDays.length === 0) {
      return (
        <div className="show-never">
          Never <FontAwesomeIcon className="chevron-right" icon={faChevronRight}/>
        </div>
      );
    } else if (sortedDays.length === 7) {
      return <p>Everyday</p>;
    } else if (sortedDays.length > 2) {
      const repeatLabel = selectedAbbreviatedDays.reduce((acc, day, index) => {
        if (index === selectedAbbreviatedDays.length - 1) {
          return acc + " and " + day;
        } else {
          return acc + ", " + day;
        }
      });
      return <p>{repeatLabel}</p>;
    } else {
      const selectedWeekend = selectedAbbreviatedDays.filter((day) =>
        ["Sat", "Sun"].includes(day)
      );
      if (selectedWeekend.length === 2) {
        return <p>Weekend</p>;
      } else {
        // Joining the days with commas, except for the last day
        const repeatLabel = selectedAbbreviatedDays.reduce(
          (acc, day, index) => {
            if (index === selectedAbbreviatedDays.length - 1) {
              return acc + " and " + day;
            } else {
              return acc + ", " + day;
            }
          }
        );
        return <p>{repeatLabel}</p>;
      }
    }
  };

  function toggleSound(sound) {
    if (selectedSound === sound) {
      setSelectedSound(null);
    } else {
      setSelectedSound(sound);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/*"
          element={
            <AlarmRoutes
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              showRepeatDays={showRepeatDays}
              setShowRepeatDays={setShowRepeatDays}
              daysOfWeek={daysOfWeek}
              toggleDay={toggleDay}
              getRepeatLabel={getRepeatLabel}
              selectedSound={selectedSound}
              setSelectedSound={setSelectedSound}
              toggleSound={toggleSound}
              soundOptions={soundOptions}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
