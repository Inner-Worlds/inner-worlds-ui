import React from "react";
import './DreamCard.css';

const DreamCard = ({ id, date, title, description, emotions, tags, lucidity }) => {
  return (
    <section className="dream-card">
      <p className="date">{date}</p>
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
      <ul className="emotions-list">{emotions.map(emotion => <li key={`emotion${emotion.id}`} data-emotionid={emotion.id}>{emotion.name}</li>)}</ul>
      <div className="styling separator"></div>
      <ul className="tags-list">{tags.map(tag => <li key={`tag${tag.id}`} data-tagid={tag.id}>{tag.name}</li>)}</ul>
      <h3 className="lucidity">Lucidity Level: {lucidity}</h3>
      <div className="dream-buttons">
        <button className="edit-dream-button fa-solid fa-pen-to-square"></button>
        <button className="delete-dream-button fa-solid fa-trash-can"></button>
      </div>
    </section>
  );
};

export default DreamCard;