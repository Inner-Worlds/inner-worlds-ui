import React, { useState } from "react";
import './DreamCard.css';

const DreamCard = ({ id, date, title, description, emotions, tags, lucidity, deleteDream, updateDream }) => {
  const [editMode, setEditMode] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const [newTitle, setNewTitle] = useState(title);
  const [newLucidity, setNewLucidity] = useState(lucidity)
  const [newDescription, setNewDescription] = useState(description);

  const handleEdit = () => {
    setEditMode(true);
  }  

  const handleSave = () => {
    if (
      date !== newDate ||
      title !== newTitle ||
      description !== newDescription ||
      lucidity !== newLucidity
    ) {
      const updatedDream = {
        dreamDate: newDate,
        title: newTitle,
        description: newDescription,
        lucidity: newLucidity
      };
      updateDream(id, updatedDream);
      // setNewDate(formatDate(newDate));
    };
    setEditMode(false);
  };

  
  const formatDate = (inputDate) => {
    if (inputDate.includes('-')) {
      const [year, month, day] = inputDate.split("-");
      return `${month[0] === '0' ? month[1] : month}/${day}/${year}`;
    } else {
      return inputDate;
    };
  }

  const sort = type => {
    if (type === 'emotions') {
      return [...emotions].sort((x, y) => x.name.length - y.name.length);
    } else if (type === 'tags') {
      return [...tags].sort((x, y) => x.name.length - y.name.length);
    };
  };

  const mapTags = allTags => {
    return allTags.map(tag => {
      return (
        <li key={`tag${tag.id}`} 
            className={tag.name.length > 10 ? "span-across" : ""}
            data-tagid={tag.id}
        >
          {tag.name}
        </li>
      );
    });
  };

  const mapEmotions = allEmotions => {
    return allEmotions.map(emotion => {
      return (
        <li key={`emotion${emotion.id}`}
            className={emotion.name.length > 9 ? "span-across" : ""} 
            data-emotionid={emotion.id}
        >
          {emotion.name}
        </li>
      );
    });
  };
  
  return (
    <section className="dream-card" id={`dream ${id}`}>
      {editMode ? <input className="date-edit" type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} /> :<p className="date">{formatDate(date)}</p>}
      {editMode ? <input className="title-edit" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} /> : <h1 className="title">{title}</h1>}
      {editMode ? <input className="description-edit" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} /> : <p className="description">{description}</p>}
      <section className="list-container">
        <section className="emotions-container">
          <h2 className="list-head">Emotions</h2>
          <ul className={emotions.length > 5 ? "card-list" : "card-list no-grid"} >
            {emotions.length > 1 ? mapEmotions(sort('emotions')) : mapEmotions(emotions)}
          </ul>
        </section>
        <div className="styling separator"></div>
        <section className="tags-container">
          <h2 className="list-head">Tags</h2>
          <ul className={tags.length > 5 ? "card-list" : "card-list no-grid"} >
            {tags.length > 1 ? mapTags(sort('tags')) : mapTags(tags)}
          </ul>
        </section>
      </section>
      {editMode ? <input className="lucidity-edit" type="number" min="1" max="5" value={newLucidity} onChange={(e) => setNewLucidity(Number(e.target.value))} /> : <p>Lucidity: {lucidity} / 5</p>}
      <div className="dream-buttons">
        <button className="edit-dream-button fa-solid fa-pen-to-square" onClick={handleEdit}></button>
        <button className="delete-dream-button fa-solid fa-trash-can" onClick={() => deleteDream(id)}></button>
        {editMode && <button className="save-dream-button" onClick={handleSave}>SAVE</button>}
      </div>
    </section>
  );
};

export default DreamCard;