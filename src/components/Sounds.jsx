import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function Sounds({selectedSound, setSelectedSound, toggleSound, soundOptions}) {
    const navigate = useNavigate();

    function handleBack() {
        navigate("/Alarm")
    };

    function handleSoundSelection(sound) {
        toggleSound(sound);
        setSelectedSound(sound)
        localStorage.setItem('selectedSound', sound.slice(15, 27))
    }

    function getFileName(path) {
        const filename = path.slice(15, 27);
        return filename
    }

  return (
    <div className="sound-container">
      <div className="sound-heading-container">
        <button type="button" className="back-btn" onClick={handleBack}>
          <FontAwesomeIcon className="chevron-left" icon={faChevronLeft} /> Back
        </button>
        <h3>Sound</h3>
      </div>
      <p>RINGTONES</p>
      <div className="sound-selection-container">
        {soundOptions.map((sound, index) => (
          <div
            key={index}
            className={selectedSound === sound ? "sound-selected" : ""}
            onClick={() => handleSoundSelection(sound)}
          >
            {getFileName(sound)}
            {selectedSound === sound && (
              <FontAwesomeIcon className="font-awesome-check" icon={faCheck} />
            )}
            <hr className="line" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sounds;
