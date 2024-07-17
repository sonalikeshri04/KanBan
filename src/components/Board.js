import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Board.css';
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

const Board = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [listName, setListName] = useState('');

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    const selectedBoard = storedBoards.find(
      (board) => board.id === parseInt(boardId)
    );

    if (selectedBoard) {
      setBoard(selectedBoard);
      setLists(selectedBoard.lists);
    }
  }, [boardId]);

  const addList = (listName) => {
    const newList = {
      id: uuidv4(),
      title: listName,
      cards: [],
    };

    const updatedLists = [...lists, newList];
    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);

    setListName('');
  };

  const updateList = (listId, newListTitle) => {
    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, title: newListTitle } : list
    );

    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);
  };

  const deleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);
  };

  const addCard = (listId, cardText) => {
    const newCard = {
      id: uuidv4(),
      text: cardText,
      assignee: null,
      dueDate: null,
      description: '',
      attachments: [],
    };

    const updatedLists = lists.map((list) =>
      list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
    );

    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);
  };

  const updateCard = (listId, cardId, updatedCard) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.map((card) =>
              card.id === cardId ? { ...card, ...updatedCard } : card
            ),
          }
        : list
    );

    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);
  };

  const deleteCard = (listId, cardId) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.filter((card) => card.id !== cardId),
          }
        : list
    );

    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);
  };

  const updateBoardInLocalStorage = (updatedBoard) => {
    const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    const updatedStoredBoards = storedBoards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    localStorage.setItem('boards', JSON.stringify(updatedStoredBoards));
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedLists = [...lists];
    const sourceListIndex = updatedLists.findIndex(
      (list) => list.id === source.droppableId
    );
    const destinationListIndex = updatedLists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const sourceList = { ...updatedLists[sourceListIndex] };
    const destinationList = { ...updatedLists[destinationListIndex] };

    const [removed] = sourceList.cards.splice(source.index, 1);
    destinationList.cards.splice(destination.index, 0, removed);

    updatedLists[sourceListIndex] = sourceList;
    updatedLists[destinationListIndex] = destinationList;

    const updatedBoard = { ...board, lists: updatedLists };

    setLists(updatedLists);
    updateBoardInLocalStorage(updatedBoard);
  };

  if (!board) {
    return <div>Loading...</div>;
  }

  return (
    <div className="board">
      <h2 className="board-title" style={{'color':'white'}}>{board.name}</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="lists-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  updateList={updateList}
                  deleteList={deleteList}
                  addCard={addCard}
                  updateCard={updateCard}
                  deleteCard={deleteCard}
                />
              ))}
              {provided.placeholder}
              <div className="add-list-container">
                <input
                  type="text"
                  className="add-list-input"
                  placeholder="Enter list title..."
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
                <button
                  className="add-list-button"
                  onClick={() => {
                    if (listName.trim() !== '') {
                      addList(listName);
                    }
                  }}
                >
                  Add List
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
