import * as APIUtil from '../util/list_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";
export const RECEIVE_UPDATED_LIST = "RECEIVE_UPDATED_LIST";
export const RECEIVE_UPDATED_LISTS = "RECEIVE_UPDATED_LISTS";



export const receiveList = ({list, board}) => {
    return {
        type: RECEIVE_LIST,
        list,
        board
    }
}


export const receiveUpdatedList = ({ list }) => {
    return {
        type: RECEIVE_UPDATED_LIST,
        list
    }
}


export const receiveUpdatedLists = ({ data }) => {
    return {
        type: RECEIVE_UPDATED_LISTS,
        lists: data
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



export const updateList = input => dispatch => (
    APIUtil.updateList(input).then(res => {
        const { data, errors } = res;

        if (errors) {
            console.log(errors);
        } else {
            const { list } = data;

            dispatch(receiveUpdatedList({
                list
            }));
        }
    })
)


export const updateListsArr = arr => dispatch => (
    APIUtil.updateListsArr(arr).then(res => {
        const { data, errors } = res;
        
        if (errors) {
            console.log(errors);
        } else {

            dispatch(receiveUpdatedLists({
                data
            }))
        }
    })
);

