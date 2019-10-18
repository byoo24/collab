export const MODAL_NEW_BOARD = "MODAL_NEW_BOARD";
export const MODAL_UPDATE_CARD = "MODAL_UPDATE_CARD";
export const MODAL_UPDATE_LIST = "MODAL_UPDATE_LIST";
export const MODAL_CLEAR = "MODAL_CLEAR";


export const modalNewBoard = (data) => {
    return {
        type: MODAL_NEW_BOARD,
        data: null
    }
}


export const modalUpdateCard = (data) => {
    return {
        type: MODAL_UPDATE_CARD,
        data
    }
}


export const modalUpdateList = (data) => {
    return {
        type: MODAL_UPDATE_LIST,
        data
    }
}


export const modalClear = (data) => {
    return {
        type: MODAL_CLEAR,
        data: null
    }
}