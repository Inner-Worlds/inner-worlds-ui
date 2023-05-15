import React from "react";
import './DreamCard.css';

const DreamCard = ({ id, date, title, description, emotions, tags, lucidity }) => {
  return (
    <li className="dream-card carousel__item">
      <p>{date}</p>
      <h1 className="title">{title}</h1>
      <p>{id}</p>
      <p className="description">{description}</p>
      <button className="edit-dream-button fa-solid fa-pen-to-square"></button>
      <ul className="emotions-list">{emotions.map(emotion => <li key={emotion}>{emotion}</li>)}</ul>
      <div className="styling separator"></div>
      <ul className="tags-list">{tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      <h3>Lucidity Level: {lucidity}</h3>
      <button className="delete-dream-button fa-solid fa-trash-can"></button>
    </li>
  );
};

export default DreamCard;