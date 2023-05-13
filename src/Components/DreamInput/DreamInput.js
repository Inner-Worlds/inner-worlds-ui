import { useState } from "react";
import { mockEmotions, mockTags } from "../../mock-data";
import "./DreamInput.css";

const DreamInput = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [lucidityLevel, setLucidityLevel] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    const dreamData = {
      date,
      label: title,
      description,
      emotions: [selectedEmotion],
      tags: [selectedTag],
      lucidityLevel,
    };

    console.log(dreamData);

    setDate("");
    setTitle("");
    setDescription("");
    setSelectedEmotion("");
    setSelectedTag("");
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
        <select
          value={selectedEmotion}
          aria-label="Emotion"
          onChange={(e) => setSelectedEmotion(e.target.value)}
        >
          <option value="">Select an emotion</option>
          {mockEmotions.data.emotions.map((emotion) => (
            <option key={emotion} value={emotion}>
              {emotion}
            </option>
          ))}
        </select>
        <br />
        <select
          value={selectedTag}
          aria-label="Tag"
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">Select a tag</option>
          {mockTags.data.tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
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
