import React from "react";
import './DreamCard.css';

const DreamCard = ({ id, date, title, description, emotions, tags, lucidity }) => {
  
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
      <p className="date">{date}</p>
      <h1 className="title">{title}</h1>
      <p className="description">{description}</p>
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
      <h3 className="lucidity">Lucidity: {lucidity} / 5</h3>
      <div className="dream-buttons">
        <button className="edit-dream-button fa-solid fa-pen-to-square"></button>
        <button className="delete-dream-button fa-solid fa-trash-can"></button>
      </div>
    </section>
  );
};

export default DreamCard;