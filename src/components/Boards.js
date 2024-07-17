import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Boards.css';

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    setBoards(storedBoards);
  }, []);

  const toggleSelectBoard = (boardId) => {
    const isSelected = selectedBoards.includes(boardId);
    if (isSelected) {
      setSelectedBoards(selectedBoards.filter(id => id !== boardId));
    } else {
      setSelectedBoards([...selectedBoards, boardId]);
    }
  };

  const deleteSelectedBoards = () => {
    const updatedBoards = boards.filter(board => !selectedBoards.includes(board.id));
    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    setSelectedBoards([]);
  };

  const createBoard = () => {
    if (boardName.trim()) {
      const newBoard = { id: Date.now(), name: boardName, lists: [] }; // Initialize with empty lists
      const updatedBoards = [...boards, newBoard];
      setBoards(updatedBoards);
      localStorage.setItem('boards', JSON.stringify(updatedBoards));
      setBoardName('');
    }
  };

  return (
    <div className="boards-container">
      <h2>Your Boards</h2>
      <div className="create-board">
        <input 
          type="text" 
          placeholder="Board Name" 
          value={boardName} 
          onChange={(e) => setBoardName(e.target.value)} 
        />
        <button onClick={createBoard}>Create Board</button>
      </div>
      <div className="boards-actions">
        <button 
          className="delete-selected-button"
          onClick={deleteSelectedBoards}
          disabled={selectedBoards.length === 0}
        >
          Delete Selected Boards
        </button>
      </div>
      <div className="boards-list">
        {boards.map(board => (
          <div key={board.id} className="board-box">
            <label className="board-checkbox">
              <input
                type="checkbox"
                checked={selectedBoards.includes(board.id)}
                onChange={() => toggleSelectBoard(board.id)}
              />
              <span className="checkmark"></span>
            </label>
            <Link to={`/boards/${board.id}`} className="board-link">
              <h3>{board.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
