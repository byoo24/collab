import axios from 'axios';


export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}


export const signup = (user) => {
    return axios.post('/api/v1/signup', user);
}


export const login = (user) => {
    return axios.post('/api/v1/login', user);
}


export const updateSession = (user) => {
    const userId = user.id;
    return axios.put(`/api/v1/users/${userId}`, user);
}




export const getSessionData = (userId) => {

    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                query {
                    user(id:"${userId}"){
                        id,
                        username,
                        email,
                        personalBoardIds,
                        boards {
                            id,
                            name,
                            description,
                            boardType,
                            createdAt,
                            updatedAt,
                            userId,
                            listIds,
                            lists {
                                id,
                                name,
                                boardId,
                                createdAt,
                                updatedAt,
                                cardIds
                                cards {
                                    id,
                                    name,
                                    description,
                                    createdAt,
                                    updatedAt,
                                    listId
                                }
                            }
                        }
                    }
                }`
        }
    });
}


