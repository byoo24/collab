import * as APIUtil from '../util/board_api_util';
import { convertArrayToObjects } from '../libs/helper_methods';

export const RECEIVE_BOARD = "RECEIVE_BOARD";


export const receiveBoard = ({ board, user}) => {
    return {
        type: RECEIVE_BOARD,
        board,
        user
    }
}





export const createBoard = input => dispatch =>(
    APIUtil.createBoard(input).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { board, user } = data;

            dispatch(receiveBoard({
                board,
                user
            }));

        }
    })
)

