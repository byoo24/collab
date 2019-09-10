import axios from 'axios';


export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'];
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}



export const signup = (user) => {
    return axios.post('/api/users/signup', user);
}

// export const signup = ({username, email, password, password2}) => {
    
//     return axios({
//         url: '/graphql',
//         method: 'post',
//         data: {
//             query: `
//                 mutation {
//                     signup(username:"${username}" email:"${email}" password:"${password}" password2:"${password2}"){
//                         id,
//                         username,
//                         email,
//                         password
//                     }
//                 }`
//         }
//     });
// }


// mutation{
//     signup(username: "byoo" email: "something@gmail.com" password: "password123" password2: "password123"){
//         id,
//             username,
//             email,
//             password
//     }
// }

// export const signup = user => {
//     request({ url: '/graphql', json: true }, (error, ))
// };

// export const signup = user => (
//     $.ajax({
//         method: 'POST',
//         url: 'api/users',
//         data: { user }
//     })
// );

// export const signup = (userData) => {
//     return axios.post('/api/users/register', userData);
// }



