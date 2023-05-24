import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_DREAM_EMOTION, DELETE_DREAM_TAG } from "../../queries";
import "./DreamCard.css";

const DreamCard = ({
  userID, 
  id,
  date,
  title,
  description,
  emotions,
  tags,
  lucidity,
  deleteDream,
  updateDream,
  updateEmotionsAndTags,
  setEditing,
  saveError,
  deleteCardError
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newDate, setNewDate] = useState(date);
  const [newTitle, setNewTitle] = useState(title);
  const [newLucidity, setNewLucidity] = useState(lucidity);
  const [newDescription, setNewDescription] = useState(description);
  const [newEmotions, setNewEmotions] = useState(emotions);
  const [newTags, setNewTags] = useState(tags);
  const [deleteError, setDeleteError] = useState({});

  const [deleteEmotion] = useMutation(DELETE_DREAM_EMOTION);
  const [deleteTag] = useMutation(DELETE_DREAM_TAG);

  const handleDeleteEmotion = async (emotionId) => {
    try {
      const { error } = await deleteEmotion({ variables: { dreamId: id, emotionId } });
      if (error) throw new Error(error);
      setNewEmotions((prevEmotions) => prevEmotions.filter((emotion) => emotion.id !== emotionId));
    } catch (error) {
      setDeleteError(error);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      const { error } = await deleteTag({ variables: { dreamId: id, tagId } });
      if (error) throw new Error(error);
      setNewTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
    } catch (error) {
      setDeleteError(error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditing(true);
  };

  const handleSave = async () => {
    const updatedDream = {
      dreamDate: newDate,
      title: newTitle,
      description: newDescription,
      lucidity: newLucidity,
    };

    if ((
        date !== newDate || 
        title !== newTitle || 
        description !== newDescription || 
        lucidity !== newLucidity
      ) && (
        emotions.length !== newEmotions.length || 
        tags.length !== newTags.length
      )) {
      updateDream(id, updatedDream);
      updateEmotionsAndTags(id, newEmotions, newTags);
    } else if (
      date !== newDate ||
      title !== newTitle ||
      description !== newDescription ||
      lucidity !== newLucidity
    ) {
      updateDream(id, updatedDream);
    } else if (
      emotions.length !== newEmotions.length ||
      tags.length !== newTags.length
    ) {
      updateEmotionsAndTags(id, newEmotions, newTags);
    };

    setEditMode(false);
    setEditing(false);
  };

  const formatDateForDisplay = (inputDate) => {
    if (inputDate.includes("-")) {
      const [year, month, day] = inputDate.split("-");
      return `${month[0] === "0" ? month[1] : month}/${day}/${year}`;
    } else {
      return inputDate;
    }
  };
  
  const formatDateForInput = (inputDate) => {
    if (inputDate.includes("/")) {
      const [month, day, year] = inputDate.split("/");
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else {
      return inputDate;
    }
  };
  

  const sort = (type) => {
    if (type === "emotions") {
      return [...newEmotions].sort((x, y) => x.name.length - y.name.length);
    } else if (type === "tags") {
      return [...newTags].sort((x, y) => x.name.length - y.name.length);
    }
  };

  const mapTags = (allTags) => {
    return allTags.map((tag) => {
      return (
        <li
          key={`tag${tag.id}`}
          className={newTags.length > 10 ? "span-across" : ""}
          data-tagid={tag.id}
        >
          {tag.name}
          {editMode && (
          <button
            className="delete-button"
            onClick={() => handleDeleteTag(tag.id)}
          >
            X
          </button>
        )}
        </li>
      );
    });
  };

  const mapEmotions = (allEmotions) => {
    return allEmotions.map((emotion) => {
      return (
        <li
          key={`emotion${emotion.id}`}
          className={newEmotions.length > 9 ? "span-across" : ""}
          data-emotionid={emotion.id}
        >
          {emotion.name}
          {editMode && (
          <button
            className="delete-button"
            onClick={() => handleDeleteEmotion(emotion.id)}
          >
            X
          </button>
        )}
        </li>
      );
    });
  };

  return (
    <section className="dream-card" id={`dream ${id}`}>
      {editMode ? (
        <input
          className="date-edit"
          type="date"
          value={formatDateForInput(newDate)}
          onChange={(e) => setNewDate(e.target.value)}
        />
      ) : (
        <p className="date">{formatDateForDisplay(date)}</p>
      )}
      {editMode ? (
        <input
          className="title-edit"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          maxLength={50}
        />
      ) : (
        <h1 className="title">{title}</h1>
      )}
      {editMode ? (
        <textarea
          className="description-edit"
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
      ) : (
        <p className="description">{description}</p>
      )}
      {deleteError.message && <h3 className="error card-error">Issue deleting, try again later.</h3> }
      <section className="list-container">
        <section className="emotions-container">
          <h2 className="list-head">Emotions</h2>
          <ul
            className={newEmotions.length > 5 ? "card-list" : "card-list no-grid"}
          >
            {newEmotions.length > 1
              ? mapEmotions(sort("emotions"))
              : mapEmotions(newEmotions)}
          </ul>
        </section>
        <div className="styling separator"></div>
        <section className="tags-container">
          <h2 className="list-head">Tags</h2>
          <ul className={tags.length > 5 ? "card-list" : "card-list no-grid"}>
            {tags.length > 1 ? mapTags(sort("tags")) : mapTags(newTags)}
          </ul>
        </section>
      </section>
      {saveError.message && <h3 className="error card-error">Issue saving, try again later.</h3> }
      {deleteCardError.message && <h3 className="error card-error">Error deleting dream, try again later.</h3> }
      {editMode ? (
        <input
          className="lucidity-edit"
          type="number"
          min="1"
          max="5"
          value={newLucidity}
          onChange={(e) => setNewLucidity(Number(e.target.value))}
        />
      ) : (
        <p>Lucidity: {lucidity} / 5</p>
      )}
      {editMode ? (
        <div className="dream-buttons">
          <button className="save-dream-button" onClick={() => handleSave()}>
            SAVE
          </button>
          <button
            className="delete-dream-button fa-solid fa-trash-can"
            onClick={() => deleteDream(id)}
          ></button>
        </div>
        ) : (
        <div className="dream-buttons">
          <button
            className="edit-dream-button fa-solid fa-pen-to-square"
            onClick={() => handleEdit()}
          ></button>
          <button
            className="delete-dream-button fa-solid fa-trash-can"
            onClick={() => deleteDream(id)}
          ></button>
        </div>
        )}
    </section>
  );
};

export default DreamCard;