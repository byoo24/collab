import * as APIUtil from '../util/list_api_util';

export const RECEIVE_LIST = "RECEIVE_LIST";
export const RECEIVE_UPDATED_LIST = "RECEIVE_UPDATED_LIST";
export const RECEIVE_UPDATED_LISTS = "RECEIVE_UPDATED_LISTS";
export const REMOVE_LIST = "REMOVE_LIST";



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


export const receiveUpdatedLists = ({ card, lists }) => {
    return {
        type: RECEIVE_UPDATED_LISTS,
        card,
        lists
    }
}


export const removeList = ({ listId, boardId }) => {
    return {
        type: REMOVE_LIST,
        listId,
        boardId
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


export const updateListsArr = listsData => dispatch => (
    APIUtil.updateListsArr(listsData).then(res => {
        const { data, errors } = res;
        
        if (errors) {
            console.log(errors);
        } else {
            const { card, lists } = data;
            dispatch(receiveUpdatedLists({
                card,
                lists
            }))
        }
    })
);


export const deleteList = list => dispatch => {
    APIUtil.deleteList(list).then(res => {
        const { data, errors } = res.data;

        if (errors) {
            console.log(errors);
        } else {
            const { deleteList } = data;
            
            dispatch(removeList({
                listId: deleteList.id,
                boardId: deleteList.boardId
            }));
        }
    })
}


