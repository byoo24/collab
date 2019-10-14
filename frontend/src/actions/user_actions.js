import { convertArrayToObjects } from '../libs/helper_methods';

export const RECEIVE_USER = "RECEIVE_USER";


export const receiveUser = ({user, boards}) => {
    boards = convertArrayToObjects(boards);

    return {
        type: RECEIVE_USER,
        user,
        boards
    }
}
