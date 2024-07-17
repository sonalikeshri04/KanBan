// List.js

import React from 'react';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import './List.css';


const List = ({
  list,
  index,
  updateList,
  deleteList,
  addCard,
  updateCard,
  deleteCard,
}) => {
  const handleDeleteList = () => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      deleteList(list.id);
    }
  };

  return (
    <Draggable draggableId={list.id.toString()} index={index}>
      {(provided) => (
        <div
          className="list"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="list-header" {...provided.dragHandleProps}>
            <h3>{list.title}</h3>
            <button onClick={handleDeleteList}>Delete</button>
          </div>
          <Droppable droppableId={list.id.toString()} type="card">
            {(provided) => (
              <div
                className="cards-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    listId={list.id}
                    index={index}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="add-card-container">
            <input
              type="text"
              className="add-card-input"
              placeholder="Enter card text..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  addCard(list.id, e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
            <button
              className="add-card-button"
              onClick={() => {
                const input = document.querySelector('.add-card-input');
                if (input.value.trim() !== '') {
                  addCard(list.id, input.value.trim());
                  input.value = '';
                }
              }}
            >
              Add Card
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;
