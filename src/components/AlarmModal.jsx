function AlarmModal({onSnooze, onStop, currentDate, alarmTime}) {
    return (
        <div className="modal-box">
            <div className="modal-content">
                <p>{currentDate}</p>
                <h2>{alarmTime}</h2>
                <h3>Alarm</h3>
                <button className="snooze-btn" onClick={onSnooze}>Snooze</button>
                <button className="stop-btn" onClick={onStop}>Stop</button>
            </div>
        </div>
    )
}

export default AlarmModal;