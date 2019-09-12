import axios from 'axios';



export const getUser = (userId) => {
    // const { name, description, userId } = input;

    return axios({
        url: '/graphql',
        method: 'get',
        data: {
            query: `
                user(id:"${userId}"){
                    id,
                    username,
                    email,
                    boards {
                        id,
                        name,
                        description
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