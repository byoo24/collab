import * as APIUtil from '../util/board_api_util';

export const RECEIVE_BOARD = "RECEIVE_BOARD";


export const receiveBoard = (board) => {
    return {
        type: RECEIVE_BOARD,
        board
    }
}



export const createBoard = input => dispatch =>(
    APIUtil.createBoard(input).then(board => {
        const { data, errors } = board.data;
        
        if (errors) {
            console.log(errors);
        } else {
            dispatch(receiveBoard(data.createBoard));
        }
    })
)