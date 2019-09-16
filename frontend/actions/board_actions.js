import * as APIUtil from '../util/board_api_util';
import { convertArrayToObjects } from '../libs/helper_methods';

export const RECEIVE_BOARD = "RECEIVE_BOARD";


export const receiveBoard = ({ board, personalBoardIds}) => {
    return {
        type: RECEIVE_BOARD,
        board,
        personalBoardIds
    }
}





export const createBoard = input => dispatch =>(
    APIUtil.createBoard(input).then(res => {
        const { data, errors } = res.data;
        if (errors) {
            console.log(errors);
        } else {
            const { user } = data.createBoard;
            delete data.createBoard.user;
            
            
            dispatch(receiveBoard({
                board: data.createBoard,
                personalBoardIds: user.personalBoardIds
            }))
        }
    })
)

