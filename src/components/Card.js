import React, { useState } from 'react';
import './Card.css';
import { v4 as uuidv4 } from 'uuid'; // Add this import statement

const Card = ({ card, updateCard, deleteCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(card.text);
  const [assignee, setAssignee] = useState(card.assignee);
  const [dueDate, setDueDate] = useState(card.dueDate);
  const [description, setDescription] = useState(card.description);
  const [attachments, setAttachments] = useState(card.attachments);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map((file) => ({
      id: uuidv4(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    const updatedAttachments = [...attachments, ...newAttachments];
    setAttachments(updatedAttachments);
    updateCard(card.id, { attachments: updatedAttachments });
  };

  const saveChanges = () => {
    updateCard(card.id, {
      text,
      assignee,
      dueDate,
      description,
      attachments,
    });
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <div className="card-editing">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="text"
            value={assignee || ''}
            onChange={(e) => setAssignee(e.target.value)}
            placeholder="Assignee"
          />
          <input
            type="date"
            value={dueDate || ''}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input type="file" multiple onChange={handleFileUpload} />
          <div className="attachments">
            {attachments.map((attachment) => (
              <div key={attachment.id}>
                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                  {attachment.name}
                </a>
              </div>
            ))}
          </div>
          <button onClick={saveChanges}>Save</button>
        </div>
      ) : (
        <div className="card-view">
          <p>{text}</p>
          <p>{assignee}</p>
          <p>{dueDate}</p>
          <p>{description}</p>
          <div className="attachments">
            {attachments.map((attachment) => (
              <div key={attachment.id}>
                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                  {attachment.name}
                </a>
              </div>
            ))}
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteCard(card.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default Card;
