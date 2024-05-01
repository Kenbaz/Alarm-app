import { useState, useEffect } from "react";
import moment from "moment";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SwitchButton from "./Switch";
import AlarmModal from "./AlarmModal";

function Alarm({
  selectedDays,
  setSelectedDays,
  showRepeatDays,
  getRepeatLabel,
  selectedSound,
}) {
  const [hoursAlarmTime, setHoursAlarmTime] = useState(null);
  const [minutesAlarmTime, setMinutesAlarmTime] = useState(null);
  const [alarmScheduled, setAlarmScheduled] = useState(false);
  const [alarmTimeoutId, setAlarmTimeoutId] = useState(null);
  const [alarms, setAlarms] = useState([]);
  const [audio, setAudio] = useState(null);
  const [snoozeDuration] = useState(10 * 1000);
  const [snoozeEnabled, setSnoozeEnabled] = useState(() => {
    const storedSnoozeEnabled = localStorage.getItem("snoozeEnabled");
    return storedSnoozeEnabled ? JSON.parse(storedSnoozeEnabled) : true;
  });
  const [alarmLabel, setAlarmLabel] = useState("");
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Loading alarms from localStorage on component mount
    const storedAlarms = localStorage.getItem("alarms");
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms));
    }
  }, []);

  function handleSetAlarm() {
    console.log("Alarm set for:", hoursAlarmTime, minutesAlarmTime);
    console.log("Selected days:", selectedDays);

    // Checking if alarmTime is not null before scheduling the alarm
    if (hoursAlarmTime && minutesAlarmTime && !alarmScheduled) {
      const now = new Date();

      // Converting alarmTime to date object
      const selectedTime = moment(
        hoursAlarmTime + ":" + minutesAlarmTime,
        "HH:mm"
      ).toDate();

      // Calculating time until the alarm triggers
      let timeUntilAlarm = selectedTime.getTime() - now.getTime();
      console.log("time until alarm triggers:", timeUntilAlarm);

      // Checking if the alarm time is in the past
      if (timeUntilAlarm < 0) {
        //Calculating the time until the next occurrence of the selected time
        const nextDay = moment(now).add(1, "day").startOf("day").toDate();
        const nextAlarmTime = moment(selectedTime)
          .set({
            year: nextDay.getFullYear(),
            month: nextDay.getMonth(),
            date: nextDay.getDate(),
          })
          .toDate();

        timeUntilAlarm = nextAlarmTime.getTime() - now.getTime();

        // Adjusting timeUntilAlarm to be positive by adding 24 hours
        const twentyFourHours = 24 * 60 * 60 * 1000;
        timeUntilAlarm += twentyFourHours;
      }
      
      // Scheduling the alarm
      const alarmTimeout = setTimeout(() => {
        if (selectedSound) {
          playAudio(selectedSound, 2)

          if (snoozeEnabled) {
            setIsAlarmModalOpen(true);
          } else {
            setIsAlarmModalOpen(false);
          }
        }
        setAlarmScheduled(false);
      }, timeUntilAlarm);

      // Updating the state to indicate that the alarm is scheduled
      setAlarmTimeoutId(alarmTimeout);
      console.log("alarm timeout:", alarmTimeout)
      setAlarmScheduled(true);
    }

    function playAudio(audioSrc, durationInSeconds) {
      const newAudio = new Audio(audioSrc);
      setAudio(newAudio)
      function play() {
        newAudio.play();
        setTimeout(() => {
          newAudio.pause();
          newAudio.currentTime = 0;
          play();
        }, durationInSeconds * 1000);
      }
      play();
    }

    // Generating a unique id for the alarm
    const id = nanoid();

    // Saving alarm with selected days to localStorage with id
    const alarm = {
      id,
      time: hoursAlarmTime + ":" + minutesAlarmTime,
      days_repeated: selectedDays,
      label: alarmLabel,
    };

    // Updating alarms state with the new alarm
    const updatedAlarms = [...alarms, alarm];
    setAlarms(updatedAlarms);

    // Updating local storage with the updated alarms
    // localStorage.setItem("alarms", JSON.stringify(updatedAlarms));

    // Reseting form fields
    setHoursAlarmTime(null);
    setMinutesAlarmTime(null);
    setSelectedDays([]);
    setAlarmLabel("");
  }

  function playAudio(audioSrc, durationInSeconds) {
    const newAudio = new Audio(audioSrc);
    setAudio(newAudio);
    function play() {
      newAudio.play();
      setTimeout(() => {
        newAudio.pause();
        newAudio.currentTime = 0;
        play();
      }, durationInSeconds * 1000);
    }
    play();
  }

  function handleCancelAlarm() {
    navigate("/");
  }

  function DigitalTimePicker({
    selectedHour,
    selectedMinute,
    handleHourClick,
    handleMinuteClick,
  }) {
    // Populating hours and minutes
    const hours = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, "0")
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
      i.toString().padStart(2, "0")
    );

    return (
      <div className="time-picker">
        <div className="hours">
          {hours.map((hour) => (
            <div
              key={hour}
              className={`hour ${hour === selectedHour ? "selected" : ""}`}
              onClick={() => handleHourClick(hour)}
            >
              {hour}
            </div>
          ))}
        </div>
        <div className="minutes">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={`minute ${
                minute === selectedMinute ? "selected" : ""
              }`}
              onClick={() => handleMinuteClick(minute)}
            >
              {minute}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function handleModalSnooze() {
    const snoozeTimeoutId = setTimeout(() => {
      if (selectedSound) {
       
        const audio = new Audio(selectedSound);
        audio.pause();
         console.log("another check...")
        // audio.loop = true;
      }
      setAlarmScheduled(false);
    }, snoozeDuration);
    console.log("snooze timeoutid:", snoozeTimeoutId)
    setAlarmTimeoutId(snoozeTimeoutId);
  }


  function handleSnoozeAlarm() {
    const newAudio = playAudio(selectedSound, 2)
      // Play the audio again after the snooze duration
    const snoozeTimeoutId = setTimeout(() => {
        if (newAudio) {
          newAudio.pause();
          console.log("checking again");
        }

        newAudio.play();
        console.log("checking...");
      }, snoozeDuration);
      setAlarmTimeoutId(snoozeTimeoutId);
  }



  function toggleSnooze() {
    const updatedSnoozeEnabled = !snoozeEnabled;
    setSnoozeEnabled(updatedSnoozeEnabled);
    localStorage.setItem("snoozeEnabled", JSON.stringify(updatedSnoozeEnabled));
  }

  return (
    <div className="alarm-container">
      <div className="alarm-setting-btn-container">
        <button type="button" onClick={handleCancelAlarm}>
          Cancel
        </button>
        <h1>Add Alarm</h1>
        <button
          type="button"
          onClick={handleSetAlarm}
          disabled={!hoursAlarmTime}
        >
          Save
        </button>
      </div>
      <div>
        <DigitalTimePicker
          selectedHour={hoursAlarmTime}
          selectedMinute={minutesAlarmTime}
          handleHourClick={(hour) => setHoursAlarmTime(hour)}
          handleMinuteClick={(minute) => setMinutesAlarmTime(minute)}
        />
      </div>

      <div className="func-container">
        <div className="repeat-container">
          <div
            className="repeat-label"
            onClick={() => {
              navigate("/RepeatDaysUI");
            }}
          >
            Repeat
            {showRepeatDays ? getRepeatLabel() : <div>{getRepeatLabel()}</div>}
          </div>
        </div>

        <hr className="line" />
        <div
          className="label-container"
          onClick={() => document.querySelector(".label-input").focus()}
        >
          Label
          <input
            className="label-input"
            type="text"
            value={alarmLabel}
            onChange={(e) => setAlarmLabel(e.target.value)}
            placeholder="Alarm"
          />
          {alarmLabel && (
            <span
              className="clear-text"
              onClick={() => setAlarmLabel("")}
              style={{ marginInlineStart: "-20px" }}
            >
              &#10006;
            </span>
          )}
        </div>
        <hr className="line" />
        <div
          className="sound-container"
          onClick={() => {
            navigate("/Sounds");
          }}
        >
          <div>Sound</div>
          {selectedSound ? (
            <div className="alarm-sound-label">
              {selectedSound.slice(15, 27)}{" "}
              <FontAwesomeIcon
                className="chevron-right"
                icon={faChevronRight}
              />
            </div>
          ) : (
            <div className="alarm-sound-label">
              {localStorage.getItem("selectedSound")}{" "}
              <FontAwesomeIcon
                className="chevron-right"
                icon={faChevronRight}
              />{" "}
            </div>
          )}
        </div>
        <hr className="line" />
        <div className="snooze-container">
          <div>Snooze</div>
          <SwitchButton
            rounded={true}
            isToggled={snoozeEnabled}
            onToggled={() => {
              toggleSnooze();
            }}
          />
        </div>
      </div>
      {isAlarmModalOpen && (
        <AlarmModal
          currentDate={moment().format("dddd, MMMM Do YYYY")}
          alarmTime={`${hoursAlarmTime}:${minutesAlarmTime}`}
          onSnooze={handleSnoozeAlarm}
          // onStop={handleModalStop}
        />
      )}
    </div>
  );
}

export default Alarm;
