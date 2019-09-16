import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const BoardIndex = (props) => {

    // SETUP
    const { match, currentUser, boards } = props;

    const [newBoardInfo, setNewBoardInfo] = useState({
        name: "",
        description: "",
        userId: currentUser.id,
        personalBoardIds: currentUser.personalBoardIds
    });


    // ComponentDidMount
    useEffect(() => {
        updateNewBoardInfo("personalBoardIds", currentUser.personalBoardIds || []);
    }, [currentUser])


    // Update State
    const updateNewBoardInfo = (field, value) => {
        const copyBoardInfo = Object.assign({}, newBoardInfo);

        copyBoardInfo[field] = value;
        setNewBoardInfo(copyBoardInfo);
    }


    // Form Submission
    const handleCreateBoard = (e) => {
        e.preventDefault();

        props.createBoard(newBoardInfo);
    }
    

    // Board Index
    const boardItems = (boards) ? 
        boards.map(board => {
            return (
                <li key={board.id} className="board_item">
                    <Link to={match.url + `/board/${board.id}`}>
                        {board.name}
                    </Link>
                </li>
            )
        }) : null;


    return (
        <div>
            <h1>BOARD INDEX</h1>
            <button className="board" onClick={handleCreateBoard}>Create Board!</button>
            <ul className="board_index">

                { boardItems }

                <li className="board_item">
                    <form className="add_board_item" onSubmit={(e) => handleCreateBoard(e)}>
                        <input
                            type="text"
                            placeholder="Add a title..."
                            value={newBoardInfo.name}
                            onChange={(e) => updateNewBoardInfo("name", e.target.value)} />

                        <input
                            type="text"
                            placeholder="Add a description..."
                            value={newBoardInfo.description}
                            onChange={(e) => updateNewBoardInfo("description", e.target.value)} />

                        <input type="submit" value="Add Board!" />
                    </form>
                </li>
            </ul>

        </div>
    )
}




export default BoardIndex;