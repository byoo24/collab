import axios from 'axios';



export const createList = (input) => {
    const { name, boardId, listIds } = input;
    
    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    createList(name:"${name}" boardId:"${boardId}" listIds:"${listIds}"){
                        id,
                        name,
                        boardId,
                        board {
                            id,
                            listIds
                        }
                    }
                }`
        }
    });
}