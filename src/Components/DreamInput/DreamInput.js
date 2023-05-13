import { useState } from "react";
import { mockEmotions, mockTags } from "../../mock-data";
import Select from 'react-select';
import "./DreamInput.css";

const DreamInput = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [lucidityLevel, setLucidityLevel] = useState(0);

  const emotionOptions = mockEmotions.data.emotions.map((emotion) => ({ value: emotion, label: emotion }));
  const tagOptions = mockTags.data.tags.map((tag) => ({ value: tag, label: tag }));

  const handleSubmit = (event) => {
    event.preventDefault();

    const dreamData = {
      date,
      label: title,
      description,
      emotions: selectedEmotion.map(emotion => emotion.value),
      tags: selectedTag.map(tag => tag.value),
      lucidityLevel,
    };

    console.log(dreamData);

    setDate("");
    setTitle("");
    setDescription("");
    setSelectedEmotion([]);
    setSelectedTag([]);
    setLucidityLevel(0);
  };

  return (
    <div className="dream-input">
      <form onSubmit={handleSubmit}>
        <h2>Dream Journal</h2>
        <input
          type="date"
          value={date}
          aria-label="Date"
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <input
          type="text"
          value={title}
          placeholder="My Dream Title.."
          aria-label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          value={description}
          placeholder="My Dream Description.."
          aria-label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Select
          isMulti
          value={selectedEmotion}
          options={emotionOptions}
          placeholder="Select Emotions.."
          onChange={setSelectedEmotion}
          className="multi-select"
        />
        <br />
        <Select
          isMulti
          value={selectedTag}
          options={tagOptions}
          placeholder="Select Tags.."
          onChange={setSelectedTag}
          className="multi-select"
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
        <button className="glow-on-hover" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DreamInput;
