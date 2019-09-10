import axios from 'axios';



export const createBoard = (input) => {
    
    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    createBoard(name:"${input.name}" userId:"${input.userId}"){
                        id,
                        name,
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