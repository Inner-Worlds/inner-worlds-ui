import { useState } from "react";
import { useHistory } from "react-router-dom";
import { mockEmotions, mockTags } from "../../mock-data";
import Select from "react-select";
import chroma from "chroma-js";
import "./DreamInput.css";
import Astronaut from "../../assets/Astronaut - (550 x 550px).svg";

const DreamInput = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [lucidityLevel, setLucidityLevel] = useState(0);
  const history = useHistory();

  const generateColor = () => chroma.random().css();
  const emotionOptions = mockEmotions.data.emotions.map((emotion) => ({
    value: emotion,
    label: emotion,
    color: generateColor(),
  }));
  const tagOptions = mockTags.data.tags.map((tag) => ({
    value: tag,
    label: tag,
    color: generateColor(),
  }));

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = data.color;
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? color
          : isFocused
          ? chroma(color).alpha(0.1).css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : color,
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
    multiValue: (styles, { data }) => {
      const color = data.color;
      return {
        ...styles,
        backgroundColor: color,
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dreamData = {
      date,
      title: title,
      description,
      emotions: selectedEmotion.map((emotion) => emotion.value),
      tags: selectedTag.map((tag) => tag.value),
      lucidityLevel,
    };

    console.log(dreamData);

    setDate("");
    setTitle("");
    setDescription("");
    setSelectedEmotion([]);
    setSelectedTag([]);
    setLucidityLevel(0);

    history.push("/dreams");
  };

  return (
    <div className="dream-input">
        <img
          className="background-astronaut"
          src={Astronaut}
          alt="Floating Astronaut"
        />
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Dream Journal</h2>
          <input
            type="date"
            value={date}
            aria-label="Date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            value={title}
            placeholder="My Dream Title.."
            aria-label="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />
          <textarea
            value={description}
            placeholder="My Dream Description.."
            aria-label="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <br />
          <Select
            isMulti
            value={selectedEmotion}
            options={emotionOptions}
            placeholder="Select Emotions.."
            onChange={setSelectedEmotion}
            styles={colourStyles}
            className="multi-select"
            classNamePrefix="select-styling"
          />
          <br />
          <Select
            isMulti
            value={selectedTag}
            options={tagOptions}
            placeholder="Select Tags.."
            onChange={setSelectedTag}
            styles={colourStyles}
            className="multi-select"
            classNamePrefix="select-styling"
          />
          <br />
          <label>
            Lucidity Level: {lucidityLevel}
            <input
              type="range"
              min={0}
              max={5}
              value={lucidityLevel}
              onChange={(e) => setLucidityLevel(Number(e.target.value))}
            />
          </label>
          <br />
          <button className="glow-on-hover" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DreamInput;
