import React from "react";
import { Routes, Route } from "react-router-dom";
import Alarm from "./Alarm";
import RepeatDaysUI from "./RepeatDays";
import Sounds from "./Sounds";

function AlarmRoutes({
  selectedDays,
  setSelectedDays,
  showRepeatDays,
  setShowRepeatDays,
  daysOfWeek,
  toggleDay,
  getRepeatLabel,
  selectedSound,
  setSelectedSound,
  toggleSound,
  soundOptions,
}) {
  return (
    <Routes>
      <Route
        path="/Alarm/*"
        element={
          <Alarm
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            showRepeatDays={showRepeatDays}
            setShowRepeatDays={setShowRepeatDays}
            daysOfWeek={daysOfWeek}
            toggleDay={toggleDay}
            getRepeatLabel={getRepeatLabel}
            selectedSound={selectedSound}
            setSelectedSound={setSelectedSound}
            soundOptions={soundOptions}
          />
        }
      />
      <Route
        path="/RepeatDaysUI"
        element={
          <RepeatDaysUI
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            showRepeatDays={showRepeatDays}
            setShowRepeatDays={setShowRepeatDays}
            daysOfWeek={daysOfWeek}
            toggleDay={toggleDay}
            getRepeatLabel={getRepeatLabel}
          />
        }
      />
      <Route
        path="/Sounds"
        element={
          <Sounds
            selectedSound={selectedSound}
            setSelectedSound={setSelectedSound}
            toggleSound={toggleSound}
            soundOptions={soundOptions}
          />
        }
      />
    </Routes>
  );
}

export default AlarmRoutes;
