import axios from 'axios';


export const createBoard = (board) => {
    return axios.post('/api/v1/boards', board);
}


export const updateBoard = (board) => {
    const boardId = board.id;
    return axios.put(`/api/v1/boards/${boardId}`, board);
}




export const deleteBoard = (input) => {
    const { id } = input;
    
    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    deleteBoard(id:"${id}"){
                        id
                    }
                }`
        }
    });
}