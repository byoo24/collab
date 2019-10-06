

export const MODAL_NEW_BOARD = "MODAL_NEW_BOARD";
export const MODAL_CLEAR = "MODAL_CLEAR";


export const modalNewBoard = (props) => {

    return {
        type: MODAL_NEW_BOARD
    }
}



export const modalClear = (props) => {
    return {
        type: MODAL_CLEAR
    }
}