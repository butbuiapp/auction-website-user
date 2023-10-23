export default function ChatbotConfig({
  mode,
  setMode,
  maxToken,
  setMaxToken,
  showConfig,
  setShowConfig,
}) {
  const maxTokenChanged = (e) => {
    if (e.target.value !== "") {
      let maxTk = parseInt(e.target.value);
      if (isNaN(maxTk) || maxTk > 100 || maxTk < 10) {
        alert("Please set max token in range [10,100]");
        return;
      } else {
        setMaxToken(maxTk);
      }
    } else {
      setMaxToken("");
    }
  };

  return (
    <div className="configContainer">
      <div>
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === "babbage-002"}
            value="babbage-002"
            onChange={() => {
              setMode("babbage-002");
            }}
          />{" "}
          babbage-002 (less accurate)
        </label>
        <br />{" "}
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === "davinci-002"}
            value="davinci-002"
            onChange={() => {
              setMode("davinci-002");
            }}
          />{" "}
          davinci-002 (moderate accurate)
        </label>
        <br />{" "}
        <label>
          <input
            type="radio"
            name="mode"
            checked={mode === "text-davinci-003"}
            value="text-davinci-003"
            onChange={() => {
              setMode("text-davinci-003");
              setMaxToken(50);
            }}
          />{" "}
          text-davinci-003 (more accurate)
        </label>
      </div>
      <label>
        Max Token:
        <label>
          <input
            type="radio"
            name="maxToken"
            value="10"
            checked={maxToken === 10}
            onChange={maxTokenChanged}
          />
          10
        </label>
        <label>
          <input
            type="radio"
            name="maxToken"
            value="50"
            checked={maxToken === 50}
            onChange={maxTokenChanged}
          />
          50
        </label>
        <label>
          <input
            type="radio"
            name="maxToken"
            value="100"
            checked={maxToken === 100}
            onChange={maxTokenChanged}
          />
          100
        </label>
      </label>
      <br />
      <button
        style={{ top: "50px", position: "relative" }}
        className="btn btn-primary"
        onClick={() => {
          setShowConfig(!showConfig);
        }}
      >
        OK
      </button>
    </div>
  );
}
