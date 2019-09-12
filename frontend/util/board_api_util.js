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
    // .then((result) => {
    //     console.log(result.data);
    // }).catch((err) => {
    //     console.log(err);
    // })
}