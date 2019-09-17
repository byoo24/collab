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
    APIUtil.createList(input).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { list, board } = data;

            dispatch(receiveList({
                list,
                board
            }));
        }
    })
)

