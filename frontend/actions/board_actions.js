import * as APIUtil from '../util/board_api_util';
import { convertArrayToObjects } from '../libs/helper_methods';

export const RECEIVE_BOARD = "RECEIVE_BOARD";
export const RECEIVE_BOARDS = "RECEIVE_BOARDS";
export const RECEIVE_LIST = "RECEIVE_LIST";
export const RECEIVE_LISTS = "RECEIVE_LISTS";


export const receiveBoard = (board) => {
    return {
        type: RECEIVE_BOARD,
        board
    }
}


export const receiveBoards = (data) => {
    const boards = convertArrayToObjects(data);

    return {
        type: RECEIVE_BOARDS,
        boards
    }
}


export const receiveList = (list) => {
    return {
        type: RECEIVE_LIST,
        list
    }
}


export const receiveLists = (data) => {
    const lists = convertArrayToObjects(data);

    return {
        type: RECEIVE_LISTS,
        lists
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


export const createList = input => dispatch => (
    APIUtil.createList(input).then(list => {
        const { data, errors } = list.data;
        debugger
        if (errors) {
            console.log(errors);
        } else {
            dispatch(receiveList(data.createList));
        }
    })
)

