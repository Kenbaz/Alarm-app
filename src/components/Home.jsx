import React from "react";
import { useNavigate } from "react-router-dom";
import AlarmModal from "./AlarmModal";

function Home() {
  const navigate = useNavigate();

  function handleAlarmClick() {
    navigate("/Alarm");
  }

  return (
    <div className="alarm-home-container">
      <div className="btn-container">
        <button className="editBtn" type="button">
          Edit
        </button>
        <button className="addBtn" type="button" onClick={handleAlarmClick}>
          <i className="fa-sharp fa-regular fa-plus"></i>
        </button>
      </div>
      <h1>Alarms</h1>
      <hr className="line" />
      <ul className="other-alarms-container">
        <h2>Other</h2>
        <hr className="line" />
      </ul>
    </div>
  );
}

export default Home;
