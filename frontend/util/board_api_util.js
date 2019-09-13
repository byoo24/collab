import axios from 'axios';



export const createBoard = (input) => {
    const { name, description, userId } = input;

    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    createBoard(name:"${name}" description:"${description}" userId:"${userId}"){
                        id,
                        name,
                        description,
                        userId
                    }
                }`
        }
    });
}



export const createList = (input) => {
    const { name, boardId } = input;

    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    createList(name:"${name}" boardId:"${boardId}"){
                        id,
                        name,
                        boardId
                    }
                }`
        }
    });
}