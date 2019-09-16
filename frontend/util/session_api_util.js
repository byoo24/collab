import axios from 'axios';


export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'];
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
                            userId,
                            listIds,
                            lists {
                                id,
                                name,
                                boardId,
                            }
                        }
                    }
                }`
        }
    });
}


