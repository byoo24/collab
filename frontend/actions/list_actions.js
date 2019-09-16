import * as APIUtil from '../util/list_api_util';
import { convertArrayToObjects } from '../libs/helper_methods';

export const RECEIVE_LIST = "RECEIVE_LIST";



export const receiveList = ({list, board}) => {
    return {
        type: RECEIVE_LIST,
        list,
        board
    }
}






export const createList = input => dispatch => (
    APIUtil.createList(input).then(list => {
        const { data, errors } = list.data;
        
        if (errors) {
            console.log(errors);
        } else {
            const { board } = data.createList;
            delete data.createList.board;

            dispatch(receiveList({
                list: data.createList,
                board
            }));
        }
    })
)

