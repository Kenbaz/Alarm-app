import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


function RepeatDaysUI({ selectedDays, daysOfWeek, toggleDay }) {
  const navigate = useNavigate();

  function handleDone() {
    navigate("/Alarm");
  }

  return (
    <div className="RepeatDays-container">
      <div className="top-container">
        <button type="button" className="back-btn" onClick={handleDone}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </button>
        <h1>Repeat</h1>
      </div>

      <div className="func-container">
          <div className="repeat-days-container">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className={selectedDays.includes(day) ? "day-selected" : ""}
                onClick={() => toggleDay(day)}
              >
                {day}
                {selectedDays.includes(day) && (
                  <FontAwesomeIcon
                    className="font-awesome-check"
                    icon={faCheck}
                  />
                )}
                <hr className="line" />
              </div>
            ))}
          </div>
      </div>
    </div>
  );
}

export default RepeatDaysUI;
